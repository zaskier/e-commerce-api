import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/services/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUsers(username: string, password: string): Promise<any> {
    const user = await this.usersService.logInUser(username)

    if (user && user.password === password) {
      const { password, username, ...rest } = user
      return user
    }
    return null //or custom message
  } //todowithpassport
}
