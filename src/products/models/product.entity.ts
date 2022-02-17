import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'
import { InventoryStatusEnum, ProductCategoryEnum } from '../models/product.model'

import { IsString, IsNumber, MaxLength, Min, IsUrl } from 'class-validator'

@Entity('product')
export class Product extends BaseEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  productId?: number

  @Column()
  @Min(10)
  @IsNumber()
  price: number

  @Column({ unique: true })
  @IsString()
  name: string

  @Column({
    type: 'enum',
    enum: InventoryStatusEnum,
    default: InventoryStatusEnum.OutOfStock,
  })
  inventoryStatus: InventoryStatusEnum

  @Column({
    type: 'enum',
    enum: ProductCategoryEnum,
  })
  category: ProductCategoryEnum

  @Column()
  @IsUrl()
  thumbnailUrl: string

  @Column({ type: 'varchar', nullable: true })
  @IsUrl()
  thumbnail64: string
}
