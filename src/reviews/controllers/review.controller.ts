import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ReviewService } from '../services/review.service'
import { ReviewPost } from '../models/post.model'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  create(@Body() reviewPost: ReviewPost) {
    return this.reviewService.create(reviewPost)
  }

  @Get()
  findAll() {
    return this.reviewService.findAllPosts()
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body() reviewPost: ReviewPost) {
    return this.reviewService.updateComment(+id, reviewPost)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.reviewService.deletePost(id)
  }
}
