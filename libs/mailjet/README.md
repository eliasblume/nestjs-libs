# `nest-mailjet`

## Installation

```
npm i nest-mailjet
```

## Features
- [x] send emails with Mailjet (send)


## Usage

as registerAsync

```typescript
@Module({
    imports: [
        MailjetModule.registerAsync({
            useFactory: () => ({
                apiKey: process.env.MAILJET_API_KEY,
                apiSecret: process.env.MAILJET_API_SECRET,
            }),
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
```

normal register also possible

### use service example
```typescript
import { Controller, Get, Logger, Query } from '@nestjs/common'
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

        return
    }
}
```

## Example
look [here](https://github.com/eliasblume/nestjs-libs) for an example implementation
