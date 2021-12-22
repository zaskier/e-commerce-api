import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthAdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user || user.role != 'admin') {
      throw err || new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    return user
  }
}
