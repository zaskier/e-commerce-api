import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/services/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUsers(email: string, password: string): Promise<any> {
    const user = await this.usersService.logInUser(email)

    if (user && user.password === password) {
      const { password, email, ...rest } = user
      return user
    }
    return null //or message
  } //todowithpassport
}
