import { IsInt, Min, Max, IsString, IsNotEmpty, Length, IsIn } from 'class-validator'

// import { RolesEnum } from 'src/users/models/user.model'
//import { InventoryStatusEnum, ProductCategoryEnum } from './models/product.model'

import { ApiProperty } from '@nestjs/swagger'
import { InventoryStatusEnum, ProductCategoryEnum } from 'src/products/models/product.model'
//import { InventoryStatusEnum, ProductCategoryEnum } from 'src/products/models/product.model'

export class CreateProductDto {
  @IsInt()
  @Min(10)
  @Max(50000)
  @ApiProperty({ type: String, description: 'price must be in range from 10 to 50,000' })
  price: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string

  @IsString()
  @IsIn(['photo album', 'cards', 'mug', 'calendar', 'canvas print', 'photo gift'])
  @ApiProperty({
    type: String,
    description: 'role can be :photo album,cards,mug,calendar,canvas print,photo gift',
    enum: ['photo album', 'cards', 'mug', 'calendar', 'canvas print', 'photo gift'],
  })
  category: ProductCategoryEnum

  @IsString()
  @IsIn(['ready', 'outOfStock', 'stopSales'])
  @ApiProperty({
    type: String,
    description: 'status can be : ready, outOfStock, stopSales',
    enum: ['ready', 'outOfStock', 'stopSales'],
  })
  inventoryStatus: InventoryStatusEnum

  @IsString()
  @Length(8, 256)
  @ApiProperty({
    type: String,
    description: 'thumbnailUrl need to be an url',
  })
  thumbnailUrl: string
}
