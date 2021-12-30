import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewDto } from '../controllers/dto/create-review.dto'
import { UpdateReviewDto } from '../controllers/dto/update.review.dto'
import { Review } from '../models/review.entity'
import { ReviewPost } from '../models/review.model'
import jwt_decode from 'jwt-decode'
import { response } from 'express'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewPostRepository: Repository<Review>,
  ) {}
  private logger = new Logger('ReviewServie')

  create(createReviewDto: CreateReviewDto, jwtPayload: string): Promise<Review> {
    createReviewDto.email = jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
    this.logger.log(
      `Rewiew : ${JSON.stringify({ review: createReviewDto })}  was added by ${
        jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
      }`,
    )
    return this.reviewPostRepository.save(createReviewDto)
  }

  findAllPosts(): Promise<Review[]> {
    return this.reviewPostRepository.find()
  }

  async findOne(id: number): Promise<Review> {
    let review = null
    return new Promise<any>(async (resolve, reject) => {
      try {
        review = await this.reviewPostRepository.findOne({
          where: {
            id,
          },
        })

        if (review != null) {
          resolve(review)
        } else {
          reject('Review: ' + id + ' not found')
        }
      } catch (err) {
        this.logger.error(`Error occured while searching for${id} review` + `${JSON.stringify(err)}`)
      }
    })
  }

  updateComment(id: number, jwtPayload: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    updateReviewDto.editedAt = new Date()
    updateReviewDto.email = jwt_decode(jwtPayload.replace('Bearer ', ''))['name']
    let authorValidagtion = this.reviewPostRepository.findOne({ id: id })

    return new Promise<any>(async (resolve, reject) => {
      Promise.all([authorValidagtion, updateReviewDto.email, updateReviewDto.editedAt]).then(values => {
        if (!!values[0].email && values[0].email == updateReviewDto.email) {
          updateReviewDto.rating = !!updateReviewDto.rating ? updateReviewDto.rating : values[0].rating
          updateReviewDto.review = !!updateReviewDto.review ? updateReviewDto.review : values[0].review
          resolve(this.reviewPostRepository.update(id, updateReviewDto))
          this.logger.log(
            `Review ${JSON.stringify({ review: updateReviewDto })} was added by ${updateReviewDto.email} `,
          )
        } else {
          reject(`Unathorised user ${updateReviewDto.email} tried to edit review through api for another user`)
        }
      })
    })
  }

  deletePost(id: number, jwtPayload: string) {
    this.logger.log(`Review ${id} was deleted by ${jwt_decode(jwtPayload.replace('Bearer ', ''))['name']}`)
    return this.reviewPostRepository.delete(id)
  }
}
