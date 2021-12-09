import { Controller, Get, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common'

import { ApiUnauthorizedResponse, ApiOkResponse, ApiBody, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from '../services/auth.service'
import { AuthoriseUserDto } from './dto/authorise-user.dto'
@Controller()
@ApiTags('authorisation/authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User Authentication' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
    description: 'lacks valid authentication credentials for the requested resource',
  })
  @ApiBody({ type: AuthoriseUserDto })
  login(@Request() req, @Body('username') username: string, @Body('password') password: string): any {
    return this.authService.login(username, password, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  @ApiOkResponse({ description: 'User Authorisation' })
  getUsersData(@Request() req): any {
    return req.user
  }
}
