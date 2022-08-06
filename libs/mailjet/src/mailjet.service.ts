import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import Mailjet, { Common, SendEmailV3_1 } from 'node-mailjet'
import { MODULE_OPTIONS_TOKEN } from './mailjet.module-definitons'
import { MailjetModuleOptions } from './interfaces/mailjet-module-options.interface'
import { MailjetApiResource, mailjetApiVersion } from './constants'
import TUnknownRec = Common.TUnknownRec

@Injectable()
export class MailjetService {
    client: Mailjet

    constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailjetModuleOptions) {
        this.client = new Mailjet(options)
    }

    async send(messages: SendEmailV3_1.IBody) {
        const data: TUnknownRec = messages as unknown as TUnknownRec
        return await this.client
            .post(MailjetApiResource.SEND, { version: mailjetApiVersion })
            .request(data)
    }
}
