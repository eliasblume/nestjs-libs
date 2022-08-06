import { Controller, Get, Query } from '@nestjs/common'
import { MailjetService, SendEmailV3_1 } from 'nest-mailjet'

@Controller()
export class AppController {
    constructor(private readonly mailjetService: MailjetService) {}

    @Get('send')
    async send(
        @Query('senderAddress') senderAddress: string,
        @Query('recipientAddress') recipientAddress: string
    ): Promise<SendEmailV3_1.ResponseStatus> {
        const repl = await this.mailjetService.send({
            Messages: [
                {
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
                },
            ],
        })

        return repl.body.Messages[0].Status
    }
}
