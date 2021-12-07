import { Module } from '@nestjs/common'
import { ReviewService } from './services/review.service'
import { ReviewController } from './controllers/review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './models/review.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
