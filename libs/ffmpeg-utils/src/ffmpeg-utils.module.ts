import { Module } from '@nestjs/common'
import { FfmpegUtilsService } from './ffmpeg-utils.service'

@Module({
    providers: [FfmpegUtilsService],
    exports: [FfmpegUtilsService],
})
export class FfmpegUtilsModule {}
