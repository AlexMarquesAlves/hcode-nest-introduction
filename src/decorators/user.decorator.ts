import { ExecutionContext, NotFoundException, createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest().params.id

    if (request.user) {
      return request.user
    } else {
      throw new NotFoundException(`Usuário não encontrado no request. Use o AuthGuard para obter o usuário`)
    }
  },
)
