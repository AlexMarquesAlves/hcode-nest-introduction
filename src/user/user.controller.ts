import { Body, Controller, Post } from '@nestjs/common'

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() body) {
    return { body }
  }
}
