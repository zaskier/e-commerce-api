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
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User registration was completed' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createNewUser(createUserDto)
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
    return this.usersService.updateUser(+id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User was user deleted' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id)
  }
}
