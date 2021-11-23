import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './controllers/users.controller'
import { User } from './entities/user.entity'
import { UserRepository } from './models/user.repository'
import { UsersService } from './services/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
