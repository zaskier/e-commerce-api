import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/services/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user)
    // done(null, { id: user.id }) //todo review adding db
  }
  deserializeUser(payload: any, done: (err: Error, payload: any) => void): any {
    // const user = this.usersService.findById(payload.id)
    // done(null, user)
    done(null, payload)
  }
}