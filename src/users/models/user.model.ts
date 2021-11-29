export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}

export class User {
  id: number
  role: RolesEnum
  email: string
  password: string
  name: string
  surname: string
  createdAt?: Date
  editedAt?: Date
}
