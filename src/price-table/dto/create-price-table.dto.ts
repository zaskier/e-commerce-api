import { IsInt, Min, Max, IsString, IsNotEmpty, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePriceTableDto {
  @IsDateString()
  effective_from: Date

  @IsDateString()
  effective_to: Date
}
