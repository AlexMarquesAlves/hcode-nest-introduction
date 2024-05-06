import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'

@Module({
  imports: [JwtModule.register({ secret: `n#s!AFG%7sPBVWF=iJ,1B0Vl0BvvULtZ` })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModules {}
