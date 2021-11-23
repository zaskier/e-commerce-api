import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column({ default: '' })
  name: string

  @Column()
  surname: string

  @Column()
  phoneNumber: number

  @Column()
  password: string
  //   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  //   createdAt: Date
}
