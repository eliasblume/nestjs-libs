import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { MailjetModule } from 'nest-mailjet'

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
