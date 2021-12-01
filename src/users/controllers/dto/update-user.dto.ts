import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsDate, IsOptional, Length, IsNumber, IsString, IsNotEmpty } from 'class-validator'
import { RolesEnum } from 'src/users/models/user.model'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly id: number
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  surname?: string

  @IsOptional()
  @IsString()
  role?: RolesEnum

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string

  @IsOptional()
  @IsString()
  @Length(8, 256)
  password?: string

  @IsOptional()
  editedAt?: Date
}
