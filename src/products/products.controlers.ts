import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, UnauthorizedException } from '@nestjs/common'
import { ProductService } from './products.service'
import { ApiUnauthorizedResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthAdminGuard } from 'src/auth/guards/jwt-auth-admin.guard'
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @UseGuards(JwtAuthAdminGuard)
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  })
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.insertPoduct(prodTitle, prodDescription, prodPrice)
    return { id: generatedId }
  }
  @Get()
  getAllProducts() {
    return this.productService.getProducts()
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId)
  }
  @Patch(':id')
  @UseGuards(JwtAuthAdminGuard)
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  })
  // @ApiBody({ type: ReviewPost }) //todoadd
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateSingleProduct(prodId, prodTitle, prodDescription, prodPrice)
    return null
  }

  @Delete(':id')
  @UseGuards(JwtAuthAdminGuard)
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  })
  removeProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId)
    return { message: 'item was removed' }
  }
}
