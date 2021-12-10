import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //todo later move validation from global to specific Pipes
    }),
  )
  const options = new DocumentBuilder()

    .setTitle('E-commerce API')

    .setDescription(
      'e-commerce API with users, reviews and products. It is using authorisation on /login to authenticate user by access token, some endpoint are only accessible for users with role "admin" on those road there is 403 status thrown',
    )

    .setVersion('1.0.0')

    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'access-token',
    )

    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('', app, document)
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
