import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { seed } from '../seed'
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

  async createMany() {
    return this.prisma.user.createMany({
      data: seed,
    })
  }

  async list() {
    return this.prisma.user.findMany({})
  }

  async show(id: number) {
    await this.exists(id)

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id)

    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
    })
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id)

    const data: any = {}

    if (birthAt) data.birthAt = new Date(birthAt)

    if (name) data.name = name
    if (email) data.email = email
    if (password) data.password = password
    if (role) data.role = role

    return this.prisma.user.update({
      where: { id },
      data: { name, email, password, birthAt },
    })
  }

  async delete(id: number) {
    await this.exists(id)

    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`That user ${id} doesn't exist`)
    }
  }
}
