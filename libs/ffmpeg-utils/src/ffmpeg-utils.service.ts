import { Injectable } from '@nestjs/common'
import stream from 'node:stream'
import ffmpeg from 'fluent-ffmpeg'
import { Readable } from 'stream'

export interface ffprobeData extends ffmpeg.FfprobeData {}

@Injectable()
export class FfmpegUtilsService {
    // sometimes ffmpeg fails idk wy but this seems to work every time (works even on fotos if you mess something up)
    async getThumbnailFallback(buffer: Buffer): Promise<Buffer> {
        console.log('fallback')
        return await new Promise((resolve, reject) => {
            const writer = new stream.Writable({
                write(chunk: Buffer) {
                    resolve(chunk)
                },
                destroy(error: Error | null) {
                    reject(error)
                },
            })

            ffmpeg(Readable.from(buffer))
                .output(writer)
                .outputOptions(['-vframes 1', '-f image2pipe'])
                .run()
        })
    }

    // this seems to give way better thumbnails (if you seek to sec:1) but fails on some videos
    async getThumbnail(buffer: Buffer): Promise<Buffer> {
        try {
            return await new Promise((resolve, reject) => {
                const writer = new stream.Writable({
                    write(chunk: Buffer) {
                        resolve(chunk)
                    },
                    destroy(error: Error | null) {
                        reject(error)
                    },
                })

                ffmpeg(Readable.from(buffer))
                    .inputOption(['-ss', '00:00:01'])
                    .output(writer)
                    .outputOptions(['-vframes 1', '-f image2pipe'])
                    .run()
            })
        } catch (e) {
            return await this.getThumbnailFallback(buffer)
        }
    }

    async ffprobe(buffer: Buffer): Promise<ffprobeData> {
        return await new Promise((resolve, reject) => {
            ffmpeg(Readable.from(buffer)).ffprobe((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    async getAspectRatio(buffer: Buffer): Promise<number> {
        const { width, height } = (await this.ffprobe(buffer)).streams.filter(
            (stream) => stream.codec_type === 'video' || stream.codec_type === 'image'
        )[0]
        return width / height
    }
}
