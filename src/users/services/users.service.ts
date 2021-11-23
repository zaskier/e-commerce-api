import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(ReviewPostEntity)
  //   private readonly reviewPostRepository: Repository<ReviewPostEntity>,
  // ) {}

  create(createUserDto: CreateUserDto) {
    return { status: 'user was created', data: createUserDto }
    // return from(this.reviewPostRepository.save(reviewPost));
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
