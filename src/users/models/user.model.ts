import { Entity } from 'typeorm'

export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}

@Entity('user')
export class User {
  id: number
  name: string
  surname: string
  role: RolesEnum
  email: string
  password: string
  createdAt?: Date
  editedAt?: Date
}
