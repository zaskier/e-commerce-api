export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}

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
