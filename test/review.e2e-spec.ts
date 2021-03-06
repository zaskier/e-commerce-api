import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Review } from '../src/reviews/models/review.entity'
import { ReviewModule } from '../src/reviews/review.module'
//todo before all add JWT for authentication
describe('ReviewController (e2e)', () => {
  let app: INestApplication
  const mockReviews = { id: 1, body: '7/10' }
  const mockReviewRepository = {
    find: jest.fn().mockResolvedValue(mockReviews),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(Review => Promise.resolve({ id: Date.now(), ...Review })),
  } //mock db connection // mock db migrations for schemas

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReviewModule],
    })
      .overrideProvider(getRepositoryToken(Review))
      .useValue(mockReviewRepository)
      .compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })
  ///it('authenticate')
  it('/review (GET)', () => {
    return request(app.getHttpServer())
      .get('/review')

      .expect('Content-Type', /json/)

      .expect(200)

      .expect(mockReviews)
  })

  it('/review (POST)', () => {
    return request(app.getHttpServer())
      .post('/review')

      .send({ body: '7/10' })

      .expect('Content-Type', /json/)

      .expect(201)

      .then(response => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          body: '7/10',
        })
      })
  })

  it('/review (POST) --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/review')

      .send({ body: 333 })

      .expect('Content-Type', /json/)

      .expect(400)
  })

  it('/review (DELETE) --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .delete(`/review/1`)

      .expect('Content-Type', /json/)

      .expect(200)
  })
})
