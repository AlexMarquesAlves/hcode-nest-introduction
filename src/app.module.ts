import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/entity/user.entity'
import { UserModule } from './user/user.module'

const mailHost = process.env.MAIL_HOST
const mailUser = process.env.MAIL_USER
const mailPass = process.env.MAIL_PASSWORD
const mailPort = process.env.MAIL_PORT

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    // OWN MODULES
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    // Mailer
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: mailHost,
          port: Number(mailPort),
          auth: {
            user: mailUser,
            pass: mailPass,
          },
        },
        defaults: {
          from: `"Hcode | Nest fundamentos" <${mailUser}>`,
        },
        template: {
          dir: `${__dirname}/templates`,
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_TCP_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppService],
})
export class AppModule {}
