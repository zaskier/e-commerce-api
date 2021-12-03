import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.setGlobalPrefix('api') //removed for global logger configuration
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //todo later set validation for specific Pipes
    }),
  )
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
