import { IsString } from 'class-validator'

export class ReviewPost {
  id?: number
  @IsString()
  body: string
  createdAt?: Date
}
