import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { Role } from '../enums/role.enum'
import { userEntityList } from '../testing/user-entity-list.mock'
import { userRepositoryMock } from '../testing/user-repository.mock'
import type { CreateUserDTO } from './dto/create-user.dto'
import { UserEntity } from './entity/user.entity'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get(getRepositoryToken(UserEntity))
  })

  it('should validate the definition successfully', () => {
    expect(userService).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  describe('Create', () => {
    it('should use create method successfully', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false)

      const data: CreateUserDTO = {
        birthAt: '2000-01-01',
        email: 'joao@hcode.com.br',
        name: 'Joao rangel',
        password: '123456',
        role: Role.User,
      }

      const result = await userService.create(data)

      expect(result).toEqual(userEntityList[0])
    })
  })
  describe('Read', () => {
    test('method list', async () => {
      const result = await userService.list()

      expect(result).toEqual(userEntityList)
    })

    test('method show', async () => {
      const result = await userService.show(1)

      expect(result).toEqual(userEntityList[0])
    })
  })
})
