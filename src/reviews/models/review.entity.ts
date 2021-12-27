import { Column, Index, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

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
}
