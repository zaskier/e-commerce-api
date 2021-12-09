import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthoriseUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email adress' })
  username: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'user password' })
  password: string
}
