import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'
import { RolesEnum } from '../models/user.model'
import * as bcrypt from 'bcrypt'

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
  password: string

  @Column()
  salt: string

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.User,
  })
  role: RolesEnum
  ///todo Use or remove
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date
}
