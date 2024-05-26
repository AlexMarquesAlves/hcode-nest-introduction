import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = Test.createTestingModule({
      providers: [UserService],
    }).compile()

    userService = module.get<userService>(userService)
  })

  it('should be a valid definition', () => {
    expect(userService).toBeDefined()
  })
})
