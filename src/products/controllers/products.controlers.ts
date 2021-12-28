import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UnauthorizedException,
  Logger,
  Put,
  ParseIntPipe,
  Headers,
  ConflictException,
} from '@nestjs/common'
import { ProductService } from '../services/products.service'
import {
  ApiUnauthorizedResponse,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { JwtAuthAdminGuard } from 'src/auth/guards/jwt-auth-admin.guard'
import { CreateProductDto } from './dto/create-product.dto'
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  private logger = new Logger('ProductController')

  @Post()
  @UseGuards(JwtAuthAdminGuard)
  @ApiResponse({
    status: 403,
    description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  //  @ApiBearerAuth() todo validate
  @ApiBody({ type: CreateProductDto })
  addProduct(@Headers('Authorization') jwtPayload: string, @Body() createProductDto: CreateProductDto) {
    return new Promise<any>((resolve, reject) => {
      this.productService
        .insertPoduct(createProductDto, jwtPayload)
        .then(review => {
          resolve(review)
        })
        .catch(error => {
          reject(new ConflictException(`Review cannot be added, error: ${JSON.stringify(error)}`))
        })
    })
  }

  @Get()
  @ApiOkResponse({ description: 'Products are listed' })
  getAllProducts() {
    return this.productService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.productService
        .getSingleProduct(id)
        .then(product => {
          resolve(product)
        })
        .catch(err => {
          reject(new ConflictException(`Product cannot be displayed, error: ${JSON.stringify(err)}`))
        })
    })
  }
  // @Patch(':id')
  // @UseGuards(JwtAuthAdminGuard)
  // @ApiUnauthorizedResponse({
  //   type: UnauthorizedException,
  //   description: 'lacks valid authentication credentials for the requested resource',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  // })
  // // @ApiBody({ type: ReviewPost }) //todoadd
  // updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDescription: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   this.productService.updateSingleProduct(prodId, prodTitle, prodDescription, prodPrice)
  //   return null
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthAdminGuard)
  // @ApiUnauthorizedResponse({
  //   type: UnauthorizedException,
  //   description: 'lacks valid authentication credentials for the requested resource',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  // })
  // removeProduct(@Param('id') prodId: string) {
  //   this.productService.deleteProduct(prodId)
  //   return { message: 'item was removed' }
  // }
}
