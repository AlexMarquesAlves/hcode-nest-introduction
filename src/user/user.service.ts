import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }

  async list() {
    return this.prisma.user.findMany({})
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    { name, email, password, birthAt }: UpdatePutUserDTO,
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
    })
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt }: UpdatePatchUserDTO,
  ) {
    const data: any = {}

    if (birthAt) data.birthAt = new Date(birthAt)

    if (name) data.name = name
    if (email) data.email = email
    if (password) data.password = password

    return this.prisma.user.update({
      where: { id },
      data: { name, email, password, birthAt },
    })
  }
}
