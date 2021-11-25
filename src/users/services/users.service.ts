import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user.repository'
const upperCamelCase = require('uppercamelcase')
@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async createNewUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase()
    createUserDto.name = upperCamelCase(createUserDto.name)
    createUserDto.surname = upperCamelCase(createUserDto.surname)
    return await this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findByIds([id])
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      updateUserDto.email = updateUserDto.email.toLowerCase()
    }
    if (updateUserDto.name) {
      updateUserDto.name = upperCamelCase(updateUserDto.name)
    }
    if (updateUserDto.surname) {
      updateUserDto.surname = upperCamelCase(updateUserDto.surname)
    }

    let updateEditedAt: Date = new Date()
    updateUserDto.editedAt = updateEditedAt
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
