import { Controller } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './auth/services/auth.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}
}
