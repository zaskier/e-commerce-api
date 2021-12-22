import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user.repository'
import { User } from '../models/user.model'
import { AppLoggerMiddleware } from 'src/utils/logger.middleware'
import { AppService } from 'src/app.service'

const upperCamelCase = require('uppercamelcase')

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}
  async logInUser(email: string): Promise<User | undefined> {
    let users = this.userRepository.find()
    return (await users).find(user => user.email === email)
  }

  async createNewUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase()
    createUserDto.name = upperCamelCase(createUserDto.name)
    createUserDto.surname = upperCamelCase(createUserDto.surname)
    let userSalt: string = await bcrypt.genSalt(12)
    createUserDto.password = await this.hashPassword(createUserDto.password, userSalt)
    return await this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    let findUser = this.userRepository.findByIds([id])
    delete findUser['password']
    return findUser
    //return this.userRepository.findByIds([id])
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      updateUserDto.email = updateUserDto.email.toLowerCase()
    }
    if (updateUserDto.name) {
      updateUserDto.name = upperCamelCase(updateUserDto.name)
    }
    if (updateUserDto.surname) {
      updateUserDto.surname = upperCamelCase(updateUserDto.surname)
    }
    if (updateUserDto.password) {
      let userSalt: string = await bcrypt.genSalt(12)
      updateUserDto.password = await this.hashPassword(updateUserDto.password, userSalt)
    }

    let updateEditedAt: Date = new Date()
    updateUserDto.editedAt = updateEditedAt
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
