import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createUserDTO } from '../testing/create-user-dto.mock'
import { userEntityList } from '../testing/user-entity-list.mock'
import { userRepositoryMock } from '../testing/user-repository.mock'
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

      const result = await userService.create(createUserDTO)

      expect(result).toEqual(userEntityList[0])
    })
  })

  describe('Read', () => {})
  describe('Update', () => {})
  describe('Delete', () => {})
})
