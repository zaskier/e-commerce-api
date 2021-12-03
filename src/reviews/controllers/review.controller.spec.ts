import { Test, TestingModule } from '@nestjs/testing'
import { ReviewController } from './review.controller'
import { ReviewService } from '../services/review.service'

describe('ReviewController', () => {
  let controller: ReviewController

  const mockReviewService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
        // todo add formatted date with validation createdAt: Date.now(),
      }
    }),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    })
      .overrideProvider(ReviewService)
      .useValue(mockReviewService)
      .compile()

    controller = module.get<ReviewController>(ReviewController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create an review', () => {
    const dtoReviewMocked = { body: 'it is good 7/10' }
    expect(controller.create(dtoReviewMocked)).toEqual({
      id: expect.any(Number),
      body: dtoReviewMocked.body,
      //todo add date validation
    })
    expect(mockReviewService.create).toHaveBeenCalledWith(dtoReviewMocked)
  })
})
