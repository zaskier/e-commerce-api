import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common'
import { ReviewService } from '../services/review.service'
import { ReviewPost } from '../models/review.model'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update.review.dto'

@Controller('review')
@ApiTags('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiCreatedResponse({ description: 'Review was posted' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Reviews are displayed' })
  findAll() {
    return this.reviewService.findAllPosts()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Review is displayed' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateReviewDto })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Review was edited' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  updateComment(@Param('id', ParseIntPipe) id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateComment(+id, updateReviewDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.deletePost(id)
  }
}
