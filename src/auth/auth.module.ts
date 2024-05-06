import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({ secret: `n#s!AFG%7sPBVWF=iJ,1B0Vl0BvvULtZ` })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModules {}
