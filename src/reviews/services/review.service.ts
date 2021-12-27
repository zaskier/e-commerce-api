import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewDto } from '../controllers/dto/create-review.dto'
import { UpdateReviewDto } from '../controllers/dto/update.review.dto'
import { Review } from '../models/review.entity'
import { ReviewPost } from '../models/review.model'
import jwt_decode from 'jwt-decode'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewPostRepository: Repository<Review>,
  ) {}
  private logger = new Logger('ReviewServie')

  create(createReviewDto: CreateReviewDto, jwtPayload: string) {
    createReviewDto.email = jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
    this.logger.log(
      `Rewiew : ${JSON.stringify({ review: createReviewDto })}  was added by ${
        jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
      }`,
    )
    return this.reviewPostRepository.save(createReviewDto)
  }

  findAllPosts() {
    return this.reviewPostRepository.find()
  }

  findOne(id: number): Promise<Review> {
    return this.reviewPostRepository.findOne({
      where: {
        id,
      },
    })
  }

  updateComment(id: number, jwtPayload: string, updateReviewDto: UpdateReviewDto) {
    updateReviewDto.editedAt = new Date()
    updateReviewDto.email = jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
    let authorValidagtion = this.reviewPostRepository.findOne({ id: id })
    Promise.all([authorValidagtion, updateReviewDto.email, updateReviewDto.editedAt]).then(values => {
      if (!!authorValidagtion['email'] && values[0].email == updateReviewDto.email) {
        this.reviewPostRepository.update(id, updateReviewDto)
        this.logger.log(`Review ${JSON.stringify({ review: updateReviewDto })} was added by ${updateReviewDto.email} `)
      } else {
        this.logger.warn(
          `Unathorised user ${updateReviewDto.email} tried to edit review through api for another user${values[0].email}`,
        )
      }
    })
  }

  deletePost(id: number, jwtPayload: string) {
    this.logger.log(`Iser ${id}} was deleted by ${jwt_decode(jwtPayload.replace('Bearer ', ''))['name']}`)
    return this.reviewPostRepository.delete(id)
  }
}
