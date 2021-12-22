import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
  Headers,
  HttpStatus,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
  Logger,
  HttpException,
} from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { JwtAuthAdminGuard } from 'src/auth/guards/jwt-auth-admin.guard'

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  private logger = new Logger('UsersController')

  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User registration was completed' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return new Promise<any>((resolve, reject) => {
      this.usersService.createNewUser(createUserDto).catch(error => {
        delete createUserDto['password']
        if (error.code === '23505') {
          this.logger.warn(`User cannot be instatiated, there is user conflict'${JSON.stringify(createUserDto)}`)
          reject(new ConflictException('User cannot be instatiated, there is user conflict'))
        } else {
          this.logger.warn(`new user was not created ${JSON.stringify(createUserDto)}`)
          reject(new ConflictException())
        }
      })
      delete createUserDto['password']
      this.logger.warn(`user was created ${JSON.stringify(createUserDto)}`)
      resolve({ status: 'user was created', data: createUserDto })
    })
  }

  @Get()
  @ApiOkResponse({ description: 'All users were listed' })
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  @ApiOkResponse({ description: 'User was found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User was updated' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return new Promise<any>((resolve, reject) => {
      this.usersService.updateUser(+id, updateUserDto).catch(error => {
        if (updateUserDto.password) {
          updateUserDto.password = ''
        }
        this.logger.warn(`user with id: ${id} was not updated ${JSON.stringify(updateUserDto)}`)
        reject(new ConflictException())
      })
      if (updateUserDto.password) {
        delete updateUserDto['password']
      }
      this.logger.warn(`user with id: ${id} was updated ${JSON.stringify(updateUserDto)}`)
      resolve({ status: 'user was updated', data: updateUserDto })
    })
  }

  @Delete(':id')
  @UseGuards(JwtAuthAdminGuard)
  @ApiOkResponse({ description: 'User was user deleted' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiResponse({
    status: 403,
    description: `Forbidden: How do you fix you don't have permission to access this resource?`,
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id)
  }
}
