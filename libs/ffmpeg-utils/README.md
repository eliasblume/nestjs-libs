# `nestjs-ffmpeg-utils`

## Installation

```
npm i nestjs-ffmpeg-utils
```

## Features
- [x] get thumbnail from video
- [x] get ffprobe info from video or image
- [x] get aspect ratio from video or image


## Usage
```typescript
@Module({
    imports: [
        FfmpegUtilsModule
    ],
    controllers: [AppController],
})
export class AppModule {}
```



### use service example
```typescript
import { Controller, Get, Query, StreamableFile, Response } from '@nestjs/common'
import { FfmpegUtilsService } from 'nestjs-ffmpeg-utils'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ApiQuery, ApiResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
    constructor(
        private readonly ffmpegUtils: FfmpegUtilsService,
        private readonly httpService: HttpService
    ) {}
    

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

```

## Example
look [here](https://github.com/eliasblume/nestjs-libs) for an example implementation
