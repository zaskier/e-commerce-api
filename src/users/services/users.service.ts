import { ConflictException, Injectable, Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../controllers/dto/create-user.dto'
import { UpdateUserDto } from '../controllers/dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../models/user.repository'
import jwt_decode from 'jwt-decode'
import { User } from '../entities/user.entity'
import upperCamelCase from 'uppercamelcase'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async logInUser(email: string): Promise<User | undefined> {
    const users = this.userRepository.find()
    return (await users).find(user => user.email === email)
  }
  private logger = new Logger('UserServie')

  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.email = createUserDto.email.toLowerCase()

    createUserDto.name = upperCamelCase(createUserDto.name)
    createUserDto.surname = upperCamelCase(createUserDto.surname)
    const userSalt: string = await bcrypt.genSalt(12)
    createUserDto.password = await this.hashPassword(createUserDto.password, userSalt)
    return await this.userRepository.save(createUserDto)
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.surname',
        'user.phone_number',
        'user.role',
        'user.createdAt',
        'user.editedAt',
      ])
      .getMany()
  }

  async findOneUser(id: number): Promise<User> {
    let user = null
    return new Promise<any>(async (resolve, reject) => {
      try {
        user = await this.userRepository
          .createQueryBuilder('user')
          .select([
            'user.id',
            'user.name',
            'user.email',
            'user.surname',
            'user.phone_number',
            'user.role',
            'user.createdAt',
            'user.editedAt',
          ])
          .where('user.id = :id', { id: id })
          .getOne()

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

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return new Promise<any>(async (resolve, reject) => {
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
        const userSalt: string = await bcrypt.genSalt(12)
        updateUserDto.password = await this.hashPassword(updateUserDto.password, userSalt)
      }
      const updateEditedAt: Date = new Date()
      updateUserDto.editedAt = updateEditedAt
      this.userRepository.findOne(id).then(value => {
        if (typeof value == 'undefined') {
          reject(new ConflictException(`User id : ${id} does not exist`))
        } else {
          resolve(this.userRepository.update(id, updateUserDto))
        }
      })
    })
  }

  deleteUser(id: number, jwtPayload: string) {
    this.logger.log(`User ${id}} was deleted by ${jwt_decode(jwtPayload.replace('Bearer ', ''))['name']}`)

    return this.userRepository.delete(id)
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
