import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import Mailjet, { Common, ILibraryResponse, SendEmailV3_1 } from 'node-mailjet'
import { MODULE_OPTIONS_TOKEN } from './mailjet.module-definitons'
import { MailjetModuleOptions } from './interfaces/mailjet-module-options.interface'
import { MailjetApiResource, mailjetApiVersion } from './constants'
import TUnknownRec = Common.TUnknownRec
import { MailjetSendResponse } from './interfaces/mailjet-service.interface'

@Injectable()
export class MailjetService {
    client: Mailjet

    constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailjetModuleOptions) {
        this.client = new Mailjet(options)
    }

    async send(messages: SendEmailV3_1.IBody): Promise<MailjetSendResponse> {
        // unfortunately types are not set correctly for Mailjet.send()
        // https://www.npmjs.com/package/node-mailjet
        const data: TUnknownRec = messages as unknown as TUnknownRec
        return (await this.client
            .post(MailjetApiResource.SEND, { version: mailjetApiVersion })
            .request(data)) as unknown as MailjetSendResponse
    }

    async sendOne(message: SendEmailV3_1.IMessage): Promise<SendEmailV3_1.IResponseMessage> {
        return (await this.send({ Messages: [message] })).body.Messages[0]
    }
}
