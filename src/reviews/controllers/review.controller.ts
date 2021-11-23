import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ReviewPost } from '../models/post.interface'
import { Observable } from 'rxjs'
import { ReviewService } from '../services/review.service'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post()
  create(@Body() post: ReviewPost): Observable<ReviewPost> {
    return this.reviewService.createPost(post)
  }
  // export class ReviewController {
  //   constructor(private reviewService: ReviewService) {}
  //   @Post()
  //   create(@Body() post: ReviewPost) {
  //     return this.reviewService.createPost(post)
  //   }

  @Get()
  findAll(): Observable<ReviewPost[]> {
    return this.reviewService.findAllPosts()
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() reviewPost: ReviewPost): Observable<UpdateResult> {
    return this.reviewService.updateComment(id, reviewPost)
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.reviewService.deletePost(id)
  }
}
