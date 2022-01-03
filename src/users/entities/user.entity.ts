import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'
import { RolesEnum } from '../models/user.model'
import { Exclude } from 'class-transformer'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true }) //todo works with unique values but throw error is 500(it could be improved)
  @Column()
  email: string

  @Column({ default: '' })
  name: string

  @Column()
  surname: string

  @Column()
  phoneNumber: string

  @Column()
  @Exclude()
  password: string

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.User,
  })
  role: RolesEnum

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date
}
