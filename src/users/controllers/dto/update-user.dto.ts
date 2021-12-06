import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsDate, IsOptional, Length, IsNumber, IsString, IsNotEmpty } from 'class-validator'
import { RolesEnum } from 'src/users/models/user.model'
//import { RolesEnum } from 'src/users/models/user.model'
import { CreateUserDto } from './create-user.dto'
import { ApiProperty, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly id: number
  @IsOptional()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  surname?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'role it can be admin or user' })
  role?: RolesEnum

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  phoneNumber?: string

  @IsOptional()
  @IsString()
  @Length(8, 256)
  @ApiProperty({ type: String, description: 'email' })
  password?: string

  @IsOptional()
  editedAt?: Date
}
