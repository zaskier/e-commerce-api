import { IsInt, Min, Max, IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateReviewDto {
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
  email: string
  product_id: number
}
