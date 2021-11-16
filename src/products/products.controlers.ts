import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
//import { get } from 'lodash';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    // TODO convert to JSON
    const generatedId = this.productService.insertPoduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: generatedId };
  }
  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateSingleProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    // return this.productService.getSingleProduct(prodId);
    this.productService.deleteProduct(prodId);
    return { message: 'item was removed' };
  }
}
