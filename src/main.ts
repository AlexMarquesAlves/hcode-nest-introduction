import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LogInterceptor } from './interceptors/log.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LogInterceptor)

  const PORT = process.env.PORT

  await app.listen(PORT, () => {
    console.log(
      `🚀 Running API server in MODE:${process.env.NODE_ENV} on Port:${PORT}`,
    )
  })
}
bootstrap()
