import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { UserIdCheckMiddleware } from 'src/Middlewares/user-id-check.Middleware'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'user/:id',
      method: RequestMethod.ALL,
    })
  }
}
