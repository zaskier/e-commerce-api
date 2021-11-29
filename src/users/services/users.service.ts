import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user.repository'
import { type } from 'os'
const upperCamelCase = require('uppercamelcase')

export type User = {
  id: number
  name: string
  username: string
  password: string
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}
  // mocked Users
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Marius',
      username: 'Marius7',
      password: 'pass1',
    },
    { id: 2, name: 'Philip', username: 'Phil1', password: 'pass2' },
  ]

  async logInUser(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username) //createDB object
  }
  //
  async createNewUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase()
    createUserDto.name = upperCamelCase(createUserDto.name)
    createUserDto.surname = upperCamelCase(createUserDto.surname)
    return await this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  // findAdmins() {
  //   return this.userRepository.find()

  //   return `This action returns all admin users`
  // }

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
