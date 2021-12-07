import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ReviewService } from '../services/review.service'
import { ReviewPost } from '../models/post.model'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('review')
@ApiTags('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ReviewPost })
  create(@Body() reviewPost: ReviewPost) {
    return this.reviewService.create(reviewPost)
  }

  @Get()
  findAll() {
    return this.reviewService.findAllPosts()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: ReviewPost })
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
