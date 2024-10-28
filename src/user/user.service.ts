import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import type { Repository } from 'typeorm'
import type { CreateUserDTO } from './dto/create-user.dto'
import type { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import type { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UserEntity } from './entity/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async create(data: CreateUserDTO) {
    if (
      await this.usersRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este e-mail já está sendo usado.')
    }

    const salt = await bcrypt.genSalt()

    data.password = await bcrypt.hash(data.password, salt)

    const user = this.usersRepository.create(data)

    return this.usersRepository.save(user)
  }

  async list() {
    return this.usersRepository.find()
  }

  async show(id: number) {
    await this.exists(id)

    return this.usersRepository.findOneBy({
      id,
    })
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUserDTO
  ) {
    await this.exists(id)

    const salt = await bcrypt.genSalt()

    password = await bcrypt.hash(password, salt)

    await this.usersRepository.update(id, {
      email,
      name,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    })

    return this.show(id)
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDTO
  ) {
    await this.exists(id)

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const data: any = {}

    if (birthAt) {
      data.birthAt = new Date(birthAt)
    }

    if (email) {
      data.email = email
    }

    if (name) {
      data.name = name
    }

    if (password) {
      const salt = await bcrypt.genSalt()
      data.password = await bcrypt.hash(password, salt)
    }

    if (role) {
      data.role = role
    }

    await this.usersRepository.update(id, data)

    return this.show(id)
  }

  async delete(id: number) {
    await this.exists(id)

    await this.usersRepository.delete(id)

    return true
  }

  async exists(id: number) {
    if (
      !(await this.usersRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`)
    }
  }
}
