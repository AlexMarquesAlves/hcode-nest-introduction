import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { name, email, password }: CreateUserDTO) {
    return { name, email, password }
  }

  @Get()
  async list() {
    return { users: [] }
  }

  @Get(':id')
  async show(@Param() params) {
    return { user: {}, params }
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdatePutUserDTO,
    @Param() params,
  ) {
    return {
      method: 'PUT',
      name,
      email,
      password,
      params,
    }
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password }: UpdatePutUserDTO,
    @Param() params,
  ) {
    return {
      method: 'PATCH',
      name,
      email,
      password,
      params,
    }
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      params,
    }
  }
}
