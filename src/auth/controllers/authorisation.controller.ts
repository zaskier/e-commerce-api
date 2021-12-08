import { Controller, Get, Post, Body, Request, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'

import { ApiCreatedResponse, ApiOkResponse, ApiBody, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from '../services/auth.service'
@Controller()
@ApiTags('authorisation/authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User Authentication' })
  login(@Request() req): any {
    return this.authService.login(req.user)
  }
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  @ApiOkResponse({ description: 'User Authorisation' })
  getUsersData(@Request() req): any {
    return req.user
  }
}
