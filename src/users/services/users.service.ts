import { Injectable, Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user.repository'
import jwt_decode from 'jwt-decode'
import { User } from '../entities/user.entity'

const upperCamelCase = require('uppercamelcase')

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async logInUser(email: string): Promise<User | undefined> {
    let users = this.userRepository.find()
    return (await users).find(user => user.email === email)
  }
  private logger = new Logger('UserServie')

  async createNewUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase()

    createUserDto.name = upperCamelCase(createUserDto.name)
    createUserDto.surname = upperCamelCase(createUserDto.surname)
    let userSalt: string = await bcrypt.genSalt(12)
    createUserDto.password = await this.hashPassword(createUserDto.password, userSalt)
    return await this.userRepository.save(createUserDto)
  }

  findAllUsers() {
    return this.userRepository.find()
  }

  async findOneUser(id: number): Promise<User> {
    let user = null
    return new Promise<any>(async (resolve, reject) => {
      try {
        user = await this.userRepository.findOne({
          where: {
            id,
          },
        })
        delete user['password']
        if (user != null) {
          resolve(user)
        } else {
          reject('User: ' + id + ' not found')
        }
      } catch (err) {
        this.logger.error(`Error occured while searching for ${id} user` + `${JSON.stringify(err)}`)
      }
    })
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

  deleteUser(id: number, jwtPayload: string) {
    this.logger.log(`User ${id}} was deleted by ${jwt_decode(jwtPayload.replace('Bearer ', ''))['name']}`)

    return this.userRepository.delete(id)
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
