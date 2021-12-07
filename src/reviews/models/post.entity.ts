import { Column, Index, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('review')
export class ReviewPostEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  review: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // editedAt: Date todo Add

  // @Column()
  // email: string  to do add email of peron posting this request
}
