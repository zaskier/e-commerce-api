import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewPostEntity } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewPostEntity])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
