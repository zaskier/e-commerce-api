import { Controller, Get, Header, Post, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { AuthenticatedGuard } from './auth/guards/authenticated.guard'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { AuthService } from './auth/services/auth.service'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  //constructor(private readonly appService: AppService, authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user)
  }

  @Get('protected')
  getUsersData(@Request() req): any {
    return req.user
  }
}
