export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}

export class User {
  id: string
  role: RolesEnum
  email: string
  password: string
  name: string
  surname: string
  createdAt?: Date
  updatedAt?: Date
}
