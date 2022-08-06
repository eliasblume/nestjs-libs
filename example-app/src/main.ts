import { NestFactory } from '@nestjs/core'

import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import 'dotenv/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    const log = new Logger(AppModule.name)

    // Validation
    app.useGlobalPipes(new ValidationPipe())

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    }

    const openapi = new DocumentBuilder()
        .setTitle(AppModule.name)
        .setDescription('app module api')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, openapi)

    SwaggerModule.setup('api', app, document, customOptions)

    await app.listen(8080, async () => {
        log.log(`Listening on port ${await app.getUrl()}`)
    })
}

bootstrap()
