import { Max, Min, IsInt, IsString, IsNotEmpty, IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ReviewPost {
  id?: number
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'review content' })
  review: string
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @ApiProperty({ type: String, description: 'rating from 1 to 5 stars' })
  rating: number
  createdAt?: Date
  editedAt?: Date
  @IsEmail()
  email: string
}
