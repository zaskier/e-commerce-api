import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { getRepository } from 'typeorm'
import { ReviewController } from '../controllers/review.controller'
import { ReviewPostEntity } from '../models/post.entity'
import { ReviewService } from './review.service'

describe('ReviewService', () => {
  let service: ReviewService
  const mockReviewRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(ReviewPostEntity => Promise.resolve({ id: Date.now(), ...ReviewPostEntity })),
    /* to be implemented and to be added new parameter editedAt and date validation */
    // update: jest.fn().mockImplementation(dto => {
    //   return {
    //     id: Date.now(),
    //     body: dto.body,
    //   }
    // }),
  }
  const mockReviewService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(ReviewPostEntity),
          useValue: mockReviewRepository,
        },
      ],
    }).compile()

    service = module.get<ReviewService>(ReviewService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should create new review ad return that', async () => {
    expect(await service.create({ review: 'I can recomend it to everyone for this price' })).toEqual({
      id: expect.any(Number),
      review: 'I can recomend it to everyone for this price',
    })
  })
})
