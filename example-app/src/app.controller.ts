import { Controller, Get, Query } from '@nestjs/common'
import { MailjetService } from 'nest-mailjet'

@Controller()
export class AppController {
    constructor(private readonly mailjetService: MailjetService) {}

    @Get('send')
    async send(
        @Query('senderAddress') senderAddress: string,
        @Query('recipientAddress') recipientAddress: string
    ) {
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
        console.log(repl.body)
        return
    }
}
