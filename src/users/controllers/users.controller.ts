import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { strictEqual } from 'assert'
//import { UsersService } from 'src/users/services/users.service'
import { BeforeInsert } from 'typeorm'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger'

const upperCamelCase = require('uppercamelcase')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  // todo @ApiUnauthorizedResponse({ description: 'Unauthorised Access' })
  @ApiCreatedResponse({ description: 'User Registration' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createNewUser(createUserDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Get all users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
