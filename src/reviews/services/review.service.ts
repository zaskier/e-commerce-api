import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { from, Observable } from 'rxjs'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { ReviewPostEntity } from '../models/post.entity'
import { ReviewPost } from '../models/post.model'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewPostEntity)
    private readonly reviewPostRepository: Repository<ReviewPostEntity>,
  ) {}

  create(reviewPost: ReviewPost) {
    const newPost = this.reviewPostRepository.create(reviewPost)
    return this.reviewPostRepository.save(newPost)
  }

  findAllPosts() {
    return from(this.reviewPostRepository.find())
  }

  updateComment(id: number, reviewPost: ReviewPost) {
    return this.reviewPostRepository.update(id, reviewPost)
  }

  deletePost(id: number) {
    return from(this.reviewPostRepository.delete(id))
  }
}
