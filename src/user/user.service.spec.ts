import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { Role } from '../enums/role.enum'
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock'
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock'
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
    it('should use method list successfully', async () => {
      const result = await userService.list()

      expect(result).toEqual(userEntityList)
    })

    it('should use method method show successfully', async () => {
      const result = await userService.show(1)

      expect(result).toEqual(userEntityList[0])
    })
  })
  describe('Update', () => {
    it('should use method method update successfully', async () => {
      const result = await userService.update(1, updatePutUserDTO)

      expect(result).toEqual(userEntityList[0])
    })
    it('should use method method updatePartial successfully', async () => {
      const result = await userService.updatePartial(1, updatePatchUserDTO)

      expect(result).toEqual(userEntityList[0])
    })
  })

  describe('Delete', () => {
    it('should use method method delete successfully', async () => {
      const result = await userService.delete(1)

      expect(result).toEqual(true)
    })
  })
})
