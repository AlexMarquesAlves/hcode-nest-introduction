import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common'

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest().params.id

    if (request.user) {
      if (filter) {
        return request.user[filter]
      } else {
        return request.user
      }
    } else {
      throw new NotFoundException(
        `Usuário não encontrado no request. Use o AuthGuard para obter o usuário`,
      )
    }
  },
)