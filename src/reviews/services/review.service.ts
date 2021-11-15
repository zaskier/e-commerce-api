import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ReviewPostEntity } from '../models/post.entity';
import { ReviewPost } from '../models/post.interface';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewPostEntity) 
        private readonly reviewPostRepository: Repository<ReviewPostEntity>
    ){}

    createPost(reviewPost: ReviewPost): Observable<ReviewPost>{
        return from(this.reviewPostRepository.save(reviewPost));
    }

    findAllPosts():Observable<ReviewPost[]>{
        return from(this.reviewPostRepository.find());
    }

    updateComment(id: number,reviewPost: ReviewPost): Observable<UpdateResult>{

        return from(this.reviewPostRepository.update(id, reviewPost));
    }

    deletePost(id: number) :Observable<DeleteResult>{
        return from(this.reviewPostRepository.delete(id));
    }
}
