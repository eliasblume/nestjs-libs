import { ConfigurableModuleBuilder } from '@nestjs/common'
import { MailjetModuleOptions } from './interfaces/mailjet-module-options.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<MailjetModuleOptions>().build()
