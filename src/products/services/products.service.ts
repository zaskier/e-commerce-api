import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto } from '../controllers/dto/create-product.dto'
import { Product } from '../models/product.entity'
import jwt_decode from 'jwt-decode'
import { UpdateProductDto } from '../controllers/dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  private logger = new Logger('ProductServie')
  insertPoduct(createProductDto: CreateProductDto, jwtPayload: string): Promise<Product> {
    this.logger.log(
      `Product : ${JSON.stringify({ product: createProductDto })}  was added by ${
        jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
      }`,
    )
    return this.productRepository.save(createProductDto)
  }

  getProducts(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async getSingleProduct(id: number): Promise<Product> {
    let product = null
    return new Promise<any>(async (resolve, reject) => {
      try {
        product = await this.productRepository.findOne(id)
        if (product != null) {
          resolve(product)
        } else {
          reject('Product: ' + id + ' not found')
        }
      } catch (err) {
        reject(`Error occured while searching for ${id} product` + `${JSON.stringify(err)}`)
      }
    })
  }

  updateProduct(id: number, jwtPayload: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return new Promise<any>(async (resolve, reject) => {
      this.productRepository.findOne(id).then(value => {
        if (typeof value == 'undefined') {
          reject(new ConflictException(`Product id : ${id} does not exist`))
        } else {
          resolve(this.productRepository.update(id, updateProductDto))
        }
      })
    })
  }

  deleteProduct(id: number, jwtPayload: string) {
    this.logger.log(`Product ${id} was deleted by ${jwt_decode(jwtPayload.replace('Bearer ', ''))['name']}`)
    return this.productRepository.delete(id)
  }
}
