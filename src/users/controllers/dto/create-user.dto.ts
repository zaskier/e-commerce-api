import { IsEmail, Length, IsNumber, IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNumber()
  id: number

  @IsEmail()
  email: string

  @IsString()
  @Length(8, 20)
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}
