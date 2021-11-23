import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index, Unique } from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true }) //todo works with unique values but throewed error is 500(it could be improved)
  @Column()
  email: string

  @Column({ default: '' })
  name: string

  @Column()
  surname: string

  @Column()
  phoneNumber: string

  @Column()
  password: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date
}
