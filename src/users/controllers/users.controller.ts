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
  ConflictException,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
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
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.usersService
        .createNewUser(createUserDto)
        .then(user => {
          delete createUserDto['password']
          resolve(user)
        })
        .catch(error => {
          if (createUserDto.password) {
            delete createUserDto['password']
          }
          if (error.code === '23505') {
            this.logger.warn(
              `User cannot be instatiated, there is user email adress conflict'${JSON.stringify(createUserDto)}`,
            )
            reject(new ConflictException('User cannot be instatiated, there is user email adress conflict'))
          } else {
            this.logger.error(
              `User cannot be instatiated, there is user email adress conflict'${JSON.stringify(createUserDto)}`,
            )
            reject(`User cannot be instatiated, ${JSON.stringify(createUserDto)}, error: ${JSON.stringify(error)}`)
          }
        })
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({ description: 'All users were listed' })
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  findAll(): Promise<any[]> {
    return this.usersService.findAllUsers()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  @ApiOkResponse({ description: 'User was found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.usersService
        .findOneUser(id)
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User was updated' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.usersService
        .updateUser(+id, updateUserDto)
        .then(user => {
          if (user.password) {
            delete user['password']
          }
          resolve(user)
        })
        .catch(error => {
          if (updateUserDto.password) {
            delete updateUserDto['password']
          }
          if (error.code === '23505') {
            this.logger.warn(
              `User cannot be instatiated, there is user email adress conflict'${JSON.stringify(updateUserDto)}`,
            )
            reject(new ConflictException('User cannot be instatiated, there is user email adress conflict'))
          } else {
            reject(`User cannot be instatiated, ${JSON.stringify(updateUserDto)}, error: ${JSON.stringify(error)}`)
          }
        })
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
  remove(@Param('id', ParseIntPipe) id: string, @Headers('Authorization') jwtPayload: string) {
    return this.usersService.deleteUser(+id, jwtPayload)
  }
}
