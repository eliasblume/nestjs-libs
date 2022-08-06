import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './mailjet.module-definitons'
import { MailjetService } from './mailjet.service'

@Module({
    providers: [MailjetService],
    exports: [MailjetService],
})
export class MailjetModule extends ConfigurableModuleClass {}
