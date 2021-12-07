import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewDto } from '../controllers/dto/create-review.dto'
import { UpdateReviewDto } from '../controllers/dto/update.review.dto'
import { Review } from '../models/review.entity'
import { ReviewPost } from '../models/review.model'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewPostRepository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewPostRepository.save(createReviewDto)
  }

  findAllPosts() {
    return this.reviewPostRepository.find()
  }

  findOne(id: number) {
    return this.reviewPostRepository.findByIds([id])
  }

  updateComment(id: number, updateReviewDto: UpdateReviewDto) {
    updateReviewDto.editedAt = new Date()
    return this.reviewPostRepository.update(id, updateReviewDto)
  }

  deletePost(id: number) {
    return this.reviewPostRepository.delete(id)
  }
}
