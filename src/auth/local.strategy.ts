import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy } from 'passport-local'
import { AuthService } from './services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super() //to remove todo connfig db?
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUsers(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
