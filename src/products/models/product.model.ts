import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiResponse,
} from '@nestjs/swagger'

import { IsString, IsNumber, MaxLength, Min, IsUrl } from 'class-validator'
import { PrimaryGeneratedColumn } from 'typeorm'

export enum InventoryStatusEnum {
  Ready = 'ready',
  OutOfStock = 'outOfStock',
  StopSales = 'stopSales',
}

export enum ProductCategoryEnum {
  PhotoAlbum = 'photo album',
  Cards = 'cards',
  Mug = 'mug',
  Calendar = 'calendar',
  CanvasPrint = 'canvas print',
  PhotoGift = 'photo gift',
}
export class ProductVm {
  @IsNumber()
  productId?: number

  @Min(10)
  @IsNumber()
  price: number

  @IsString()
  name: string

  @IsString()
  inventoryStatus: InventoryStatusEnum

  @IsString()
  category: ProductCategoryEnum

  @IsUrl()
  thumbnailUrl: string
}
