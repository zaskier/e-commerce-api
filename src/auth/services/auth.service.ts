import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/services/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUsers(email: string, password: string): Promise<any> {
    const user = await this.usersService.logInUser(email)

    if (user && user.password === password) {
      const { password, email, ...rest } = user
      return user
    }
    return null //or message
  } //todowithpassport

  async login(user: any) {
    const payload = { name: user.name, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
