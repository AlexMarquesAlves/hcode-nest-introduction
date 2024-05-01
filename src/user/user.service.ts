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
    console.log({ name, email, password, birthAt })

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

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    console.log(data)

    return this.prisma.user.update({
      where: { id },
      data,
    })
  }
}
