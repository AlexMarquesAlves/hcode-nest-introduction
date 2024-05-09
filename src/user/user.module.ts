import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common'
import { UserIdCheckMiddleware } from 'src/Middlewares/user-id-check.Middleware'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

// TODO resolver dependência circular
@Module({
  imports: [PrismaModule, forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'user/:id',
      method: RequestMethod.ALL,
    })
  }
}
