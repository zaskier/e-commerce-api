import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ReviewPostEntity } from '../src/reviews/models/post.entity'
import { ReviewModule } from '../src/reviews/review.module'

describe('ReviewController (e2e)', () => {
  let app: INestApplication
  const mockReviewRepository = {
    find: jest.fn(),
  } //mock db connection // mock db migrations for schemas

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReviewModule],
    })
      .overrideProvider(getRepositoryToken(ReviewPostEntity))
      .useValue(mockReviewRepository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/review (GET)', () => {
    return request(app.getHttpServer()).get('/review').expect(200)
  })
})
