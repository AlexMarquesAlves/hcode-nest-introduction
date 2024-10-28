import {
  type ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common'

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if (request.user) {
      if (filter) {
        return request.user[filter]
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        return request.user
      }
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.'
      )
    }
  }
)
