import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../../users/services/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUsers(email: string, password: string): Promise<any> {
    const user = await this.usersService.logInUser(email)

    const saltRegex = /(\$)([A-Za-z0-9.]){2}(\$)([0-9]){2}(\$)(.){22}/g

    password = await this.usersService.hashPassword(password, String(user.password.match(saltRegex)))
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, email, ...rest } = user
      return user
    }
    return null
  }

  async login(username, user: any) {
    const payload = { name: username, role: user.role }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
