import { IsInt, Min, Max, IsString, IsNotEmpty, Length, IsIn, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { InventoryStatusEnum, ProductCategoryEnum } from '../../models/product.model'

export class UpdateProductDto {
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(50000)
  @ApiProperty({ type: String, description: 'price must be in range from 10 to 50,000' })
  price?: number
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name?: string
  @IsOptional()
  @IsString()
  @IsIn(['photo album', 'cards', 'mug', 'calendar', 'canvas print', 'photo gift'])
  @ApiProperty({
    type: String,
    description: 'role can be :photo album,cards,mug,calendar,canvas print,photo gift',
    enum: ['photo album', 'cards', 'mug', 'calendar', 'canvas print', 'photo gift'],
  })
  category?: ProductCategoryEnum
  @IsOptional()
  @IsString()
  @IsIn(['ready', 'outOfStock', 'stopSales'])
  @ApiProperty({
    type: String,
    description: 'status can be : ready, outOfStock, stopSales',
    enum: ['ready', 'outOfStock', 'stopSales'],
  })
  inventoryStatus?: InventoryStatusEnum
  @IsOptional()
  @IsString()
  @Length(8, 256)
  @ApiProperty({
    type: String,
    description: 'thumbnailUrl need to be an url',
  })
  thumbnailUrl?: string
}
