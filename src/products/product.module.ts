import { Module } from '@nestjs/common'
import { ProductService } from './services/products.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from './controllers/products.controlers'
import { Product } from './models/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
