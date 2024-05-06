import { Body, Controller, Post } from '@nestjs/common'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { AuthRegisterDTO } from './dto/auth-register.dto'

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body body: AuthLoginDTO) {}

  @Post('login')
  async register(@Body body: AuthRegisterDTO) {}
}
