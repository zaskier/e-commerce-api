import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, //cookie expiring in ms
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //todo later set validation for specific Pipes
    }),
  )
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
