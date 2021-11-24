export enum RolesEnum {
  Admin = 'Admin',
  User = 'User',
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
