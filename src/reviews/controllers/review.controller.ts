import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ReviewService } from '../services/review.service'
import { ReviewPost } from '../models/review.model'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update.review.dto'

@Controller('review')
@ApiTags('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ReviewPost })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto)
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
  updateComment(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateComment(+id, updateReviewDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number) {
    return this.reviewService.deletePost(id)
  }
}
