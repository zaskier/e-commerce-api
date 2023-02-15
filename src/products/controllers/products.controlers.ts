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
  ParseIntPipe,
  Headers,
  ConflictException,
} from '@nestjs/common'
import { ProductService } from '../services/products.service'
import { ApiUnauthorizedResponse, ApiResponse, ApiTags, ApiBody, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'
import { JwtAuthAdminGuard } from 'src/auth/guards/jwt-auth-admin.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from '../models/product.entity'
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
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  addProduct(@Headers('Authorization') jwtPayload: string, @Body() createProductDto: CreateProductDto): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.productService
        .insertPoduct(createProductDto, jwtPayload)
        .then(product => {
          resolve(product)
        })
        .catch(error => {
          if (error.code === '23505') {
            reject(new ConflictException('Product cannot be instatiated, there is user name conflict'))
          } else {
            reject(
              `Product cannot be instatiated, ${JSON.stringify(createProductDto)}, error: ${JSON.stringify(error)}`,
            )
          }
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

  @Patch(':id')
  @UseGuards(JwtAuthAdminGuard)
  @ApiBody({ type: UpdateProductDto })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Product was edited' })
  @ApiResponse({
    status: 403,
    description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiBody({ type: UpdateProductDto })
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') jwtPayload: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return new Promise<any>(async (resolve, reject) => {
      this.productService
        .updateProduct(id, jwtPayload, updateProductDto)
        .then(product => {
          resolve(product)
        })
        .catch(error => {
          if (error.code === '23505') {
            reject(
              new ConflictException(
                `Product cannot be instatiated, there is product name conflict'${JSON.stringify(updateProductDto)}`,
              ),
            )
          } else {
            reject(
              `Product cannot be instatiated, ${JSON.stringify(updateProductDto)}, error: ${JSON.stringify(error)}`,
            )
          }
        })
    })
  }

  @Delete(':id')
  @UseGuards(JwtAuthAdminGuard)
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden: you don't have permission to perform thius operation`,
  })
  removeProduct(@Param('id', ParseIntPipe) id: number, @Headers('Authorization') jwtPayload: string) {
    return this.productService.deleteProduct(id, jwtPayload)
  }
}
