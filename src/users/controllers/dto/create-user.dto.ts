import { IsEmail, Length, IsNumber, IsIn, IsString, IsNotEmpty } from 'class-validator'
import { RolesEnum } from 'src/users/models/user.model'
import { BeforeInsert } from 'typeorm'
import { ApiProperty, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { isInt16Array } from 'util/types'

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ type: String, description: 'email' })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'surname' })
  surname: string

  @IsString()
  @IsIn(['admin', 'user'])
  @ApiProperty({ type: String, description: 'role it can be admin or user' })
  role: RolesEnum

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phone number' })
  phoneNumber: string

  @IsString()
  @Length(8, 256)
  @ApiProperty({ type: String, description: 'password' })
  password: string

  salt: string
}
