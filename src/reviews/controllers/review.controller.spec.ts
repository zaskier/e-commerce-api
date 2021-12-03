import { Test, TestingModule } from '@nestjs/testing'
import { ReviewController } from './review.controller'
import { ReviewService } from '../services/review.service'
import { domainToASCII } from 'url'

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
    updateComment: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
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

  const dtoReviewMocked = { body: 'it is good 7/10' }

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create an review', () => {
    expect(controller.create(dtoReviewMocked)).toEqual({
      id: expect.any(Number),
      body: dtoReviewMocked.body,
      //todo add date validation
    })
    expect(mockReviewService.create).toHaveBeenCalledWith(dtoReviewMocked)
  })

  it('should update an review', () => {
    expect(controller.updateComment(1, dtoReviewMocked)).toEqual({
      id: 1,
      ...dtoReviewMocked,
    })
    expect(mockReviewService.updateComment).toHaveBeenCalled()
  })
})
