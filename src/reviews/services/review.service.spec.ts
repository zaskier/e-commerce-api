import { Test, TestingModule } from '@nestjs/testing'
import { ReviewController } from '../controllers/review.controller'
import { ReviewService } from './review.service'

describe('ReviewService', () => {
  let service: ReviewService
  const mockReviewService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    })
      .overrideProvider(ReviewService)
      .useValue(mockReviewService)
      .compile()

    service = module.get<ReviewService>(ReviewService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
