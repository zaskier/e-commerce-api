import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user.repository'
import { RolesEnum, User } from '../models/user.model'

const upperCamelCase = require('uppercamelcase')

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}
  async logInUser(email: string): Promise<User | undefined> {
    let users = this.userRepository.find()
    return (await users).find(user => user.email === email) //createDB object
  }

  async createNewUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase()
    createUserDto.name = upperCamelCase(createUserDto.name)
    createUserDto.surname = upperCamelCase(createUserDto.surname)
    createUserDto.salt = await bcrypt.genSalt()
    createUserDto.password = await this.hashPassword(createUserDto.password, createUserDto.salt)
    try {
      return await this.userRepository.save(createUserDto)
    } catch (error) {
      if (createUserDto.role != RolesEnum.Admin && createUserDto.role != RolesEnum.User) {
        return new ConflictException('Possible assigned role for new account can be only "user" or "admin"')
      }
      if (error.code === '23505') {
        return new ConflictException('Email already is assigned to another account')
      } else {
        return new InternalServerErrorException()
      }
    }
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findByIds([id])
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
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
  // todo make it wortking private different way or duplicate code
  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
