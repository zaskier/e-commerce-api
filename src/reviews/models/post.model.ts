import { IsString, IsDate, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ReviewPost {
  id?: number
  @IsString()
  @ApiProperty({ type: String, description: 'review content' })
  review: string
  createdAt?: Date
}
