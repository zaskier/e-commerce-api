import { IsEmail, Length, IsIn, IsString, IsNotEmpty } from 'class-validator'
import { RolesEnum } from 'src/users/models/user.model'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'surname',
  })
  surname: string

  @IsString()
  @IsIn(['admin', 'user'])
  @ApiProperty({
    type: String,
    description: 'role it can be admin or user',
    enum: ['admin', 'user'],
  })
  role: RolesEnum

  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'phone number',
  })
  phoneNumber: string

  @IsString()
  @Length(8, 256)
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string
}
