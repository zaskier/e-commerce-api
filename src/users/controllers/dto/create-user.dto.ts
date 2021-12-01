import { IsEmail, Length, IsNumber, IsString, IsNotEmpty } from 'class-validator'
import { RolesEnum } from 'src/users/models/user.model'
import { BeforeInsert } from 'typeorm'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsString()
  role: RolesEnum

  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @IsString()
  @Length(8, 32)
  password: string

  salt: string
}
