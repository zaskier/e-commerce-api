import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { LocalStrategy } from './local.strategy'
import { AuthService } from './services/auth.service'
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
