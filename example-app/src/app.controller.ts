import { Controller, Get, Query, StreamableFile, Response } from '@nestjs/common'
import { MailjetService, SendEmailV3_1 } from 'nest-mailjet'
import { FfmpegUtilsService } from 'nestjs-ffmpeg-utils'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ApiQuery, ApiResponse } from '@nestjs/swagger'
@Controller()
export class AppController {
    constructor(
        private readonly mailjetService: MailjetService,
        private readonly ffmpegUtils: FfmpegUtilsService,
        private readonly httpService: HttpService
    ) {}

    @Get('send')
    async send(
        @Query('senderAddress') senderAddress: string,
        @Query('recipientAddress') recipientAddress: string
    ): Promise<SendEmailV3_1.ResponseStatus> {
        const repl = await this.mailjetService.sendOne({
            From: {
                Email: senderAddress,
            },
            To: [
                {
                    Email: recipientAddress,
                },
            ],
            Subject: 'nestjs test mail',
            TextPart: 'nestjs test mail content',
        })

        return repl.Status
    }

    @Get('ffmpeg/ffprobe')
    @ApiQuery({ name: 'url', description: 'image/video url' })
    async ffprobe(@Query('url') url: string) {
        const get = await firstValueFrom(this.httpService.get(url, { responseType: 'arraybuffer' }))
        return await this.ffmpegUtils.ffprobe(get.data)
    }

    @Get('ffmpeg/thumbnail')
    @ApiQuery({ name: 'url', description: 'video url' })
    @ApiResponse({
        status: 200,
        content: {
            'image/jpeg': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async thumbnail(@Query('url') url: string, @Response({ passthrough: true }) res) {
        const get = await firstValueFrom(this.httpService.get(url, { responseType: 'arraybuffer' }))
        return new StreamableFile(await this.ffmpegUtils.getThumbnail(get.data), { type: 'image/jpeg' })
    }
}
