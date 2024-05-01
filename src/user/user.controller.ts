import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() body) {
    return { body }
  }

  @Get()
  async getUser(@Body() body) {
    return { body }
  }
}
