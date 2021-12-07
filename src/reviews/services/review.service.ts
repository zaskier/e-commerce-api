import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ReviewPostEntity } from '../models/post.entity'
import { ReviewPost } from '../models/post.model'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewPostEntity)
    private readonly reviewPostRepository: Repository<ReviewPostEntity>,
  ) {}

  create(reviewPost: ReviewPost) {
    return this.reviewPostRepository.save(reviewPost)
  }

  findAllPosts() {
    return this.reviewPostRepository.find()
  }

  findOne(id: number) {
    return this.reviewPostRepository.findByIds([id])
  }

  updateComment(id: number, reviewPost: ReviewPost) {
    return this.reviewPostRepository.update(id, reviewPost)
  }

  deletePost(id: number) {
    return this.reviewPostRepository.delete(id)
  }
}
