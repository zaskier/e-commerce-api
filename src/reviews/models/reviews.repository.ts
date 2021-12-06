import { EntityRepository, Repository } from 'typeorm'
import { ReviewPostEntity } from './post.entity'

@EntityRepository(ReviewPostEntity)
export class ReviewRepository extends Repository<ReviewPostEntity> {}
