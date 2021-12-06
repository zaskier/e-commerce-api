import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.setGlobalPrefix('api') //removed for global logger configuration
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //todo later move validation from global to specific Pipes
    }),
  )
  const options = new DocumentBuilder()

    .setTitle('E-commerce API')

    .setDescription('e-commerce API')

    .setVersion('1.0.0')

    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('', app, document)
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
