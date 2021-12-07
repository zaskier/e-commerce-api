import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from './products/product.module'
import { ReviewModule } from './reviews/review.module'
import { ProductsController } from './products/products.controlers'
import { ProductService } from './products/products.service'
import { UsersModule } from './users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AppLoggerMiddleware } from './utils/logger.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true, //todo validate with according to cooding standards for production enviorment
    }),
    ProductModule,
    ReviewModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
