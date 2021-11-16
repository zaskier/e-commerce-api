import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controlers';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
