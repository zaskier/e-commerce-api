import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto } from '../controllers/dto/create-product.dto'
import { Product } from '../models/product.entity'
// import { Product } from '../models/product.entity'
// import { Product } from './product.model'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly reviewPostRepository: Repository<Product>,
  ) {}
  private logger = new Logger('ProductServie')
  // private products: Product[] = []
  insertPoduct(createProductDto: CreateProductDto, jwtPayload: string) {
    //   createProductDto.email = jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
    // this.logger.log(
    //   `Rewiew : ${JSON.stringify({ review: createProductDto })}  was added by ${
    //     jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
    //   }`,
    // )
    return this.reviewPostRepository.save(createProductDto)
  }
  // insertPoduct(title: string, desc: string, price: number) {
  //   const prodId = Math.random().toString()
  //   const newProduct = new Product(prodId, title, desc, price) //Todo, implement better id than date(with some avaliable Id libraries)
  //   this.products.push(newProduct)
  //   return prodId
  // }

  getProducts() {
    return this.reviewPostRepository.find()
  }

  async getSingleProduct(id: number) {
    let product = null
    return new Promise<any>(async (resolve, reject) => {
      console.log(id)
      try {
        product = await this.reviewPostRepository.findOne(id)
        if (product != null) {
          resolve(product)
        } else {
          reject('Review: ' + id + ' not found')
        }
      } catch (err) {
        this.logger.error(`Error occured while searching for${id} product` + `${err}`)
        reject(`Error occured while searching for${id} product` + `${err}`)
        // return `Error occured while searching for${id} product` + `${JSON.stringify(err)}`
      }
    })
  }

  // updateSingleProduct(productId: string, title: string, desc: string, price: number) {
  //   //todo add price validation
  //   const [product, index] = this.findProduct(productId)
  //   const updatedProduct = { ...product }
  //   if (title) {
  //     updatedProduct.title = title
  //   }
  //   if (desc) {
  //     updatedProduct.desc = desc
  //   }
  //   if (price) {
  //     updatedProduct.price = price
  //   }
  //   this.products[index] = updatedProduct
  // }

  // deleteProduct(prodId: string) {
  //   const index = this.findProduct(prodId)[1]
  //   this.products.splice(index, 1)
  // }

  // private findProduct(id: string): [Product, number] {
  //   const productIndex = this.products.findIndex(prod => prod.id === id)
  //   const product = this.products[productIndex]
  //   if (!product) {
  //     throw new NotFoundException('Could not find the product.')
  //   }
  //   return [product, productIndex]
  // }
}
