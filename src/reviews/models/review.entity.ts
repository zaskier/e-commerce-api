import { Product } from 'src/products/models/product.entity'
import { Column, Index, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm'
@Entity('review')
export class Review extends BaseEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  review: string

  @Column()
  rating: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date

  @Column()
  email: string

  @Column()
  product_id: number

  @ManyToOne(type => Product, product => product.productId)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'productId' })
  product: Product
}
