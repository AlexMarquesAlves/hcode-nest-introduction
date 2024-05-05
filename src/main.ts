import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.PORT

  await app.listen(PORT, () => {
    console.log(
      `🚀 Running API server in MODE:${process.env.NODE_ENV} on Port:${PORT}`,
    )
  })
}
bootstrap()
