import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

const upperCamelCase = require('uppercamelcase')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'User Registration' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createNewUser(createUserDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Get all users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
