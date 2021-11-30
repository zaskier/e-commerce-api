import { Controller, Get, Header, Post, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { AuthenticatedGuard } from './auth/guards/authenticated.guard'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { msg: 'You are logged In' }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected') //tessting sessions path
  getUsersData(@Request() req): any {
    return req.user
  }
}
