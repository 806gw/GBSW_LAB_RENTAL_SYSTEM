import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as expressBasicAuth from 'express-basic-auth'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })

  app.use(
    ['/api', '/api-jsom'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PW
      }
    })
  )
  const config = new DocumentBuilder()
    .setTitle('GBSW_랩실대여 Api문서')
    .setDescription('이걸 내가하네?')
    .setVersion('1.0')
    .addBearerAuth() // 인증 추가
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
