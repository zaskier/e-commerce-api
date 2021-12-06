import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ReviewService } from '../services/review.service'
import { ReviewPost } from '../models/post.model'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() reviewPost: ReviewPost) {
    return this.reviewService.create(reviewPost)
  }

  @Get()
  findAll() {
    return this.reviewService.findAllPosts()
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateComment(@Param('id') id: number, @Body() reviewPost: ReviewPost) {
    return this.reviewService.updateComment(+id, reviewPost)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number) {
    return this.reviewService.deletePost(id)
  }
}
