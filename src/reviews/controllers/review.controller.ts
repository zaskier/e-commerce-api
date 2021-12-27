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
  Headers,
  ConflictException,
  Logger,
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
  private logger = new Logger('ReviewController')
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiCreatedResponse({ description: 'Review was posted' })
  create(@Headers('Authorization') jwtPayload: string, @Body() createReviewDto: CreateReviewDto) {
    return new Promise<any>((resolve, reject) => {
      this.reviewService
        .create(createReviewDto, jwtPayload)
        .then(review => {
          resolve(review)
        })
        .catch(error => {
          reject(new ConflictException(`Review cannot be added, error: ${JSON.stringify(error)}`))
        })
    })
  }

  @Get()
  @ApiOkResponse({ description: 'Reviews are displayed' })
  findAll() {
    return this.reviewService.findAllPosts()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Review is displayed' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.reviewService
        .findOne(id)
        .then(review => {
          resolve(review)
        })
        .catch(err => {
          reject(err)
        })
    })
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
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') jwtPayload: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateComment(+id, jwtPayload, updateReviewDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  delete(@Param('id', ParseIntPipe) id: number, @Headers('Authorization') jwtPayload: string) {
    return this.reviewService.deletePost(id, jwtPayload)
  }
}
