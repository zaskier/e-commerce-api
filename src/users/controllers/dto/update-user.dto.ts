import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsOptional, Length, IsString, IsNotEmpty } from 'class-validator'
import { RolesEnum } from '../../models/user.model'

import { CreateUserDto } from './create-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly id: number
  @IsOptional()
  @IsEmail()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  surname?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    enum: ['admin', 'user'],
    description: 'role it can be admin or user',
  })
  role?: RolesEnum

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  phone_number?: string

  @IsOptional()
  @IsString()
  @Length(8, 256)
  @ApiProperty({
    type: String,
    description: 'email',
  })
  password?: string

  @IsOptional()
  editedAt?: Date
}
