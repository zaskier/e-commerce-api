import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index, Unique } from 'typeorm'
import { RolesEnum } from '../models/user.model'
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

  @Column({
    //todo return other enum validation error then 500 and tranform input to lower case
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
