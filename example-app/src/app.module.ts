import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { MailjetModule } from 'nest-mailjet'
import { FfmpegUtilsModule } from 'nestjs-ffmpeg-utils'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [
        MailjetModule.registerAsync({
            useFactory: () => ({
                apiKey: process.env.MAILJET_API_KEY,
                apiSecret: process.env.MAILJET_API_SECRET,
            }),
        }),
        HttpModule,
        FfmpegUtilsModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
