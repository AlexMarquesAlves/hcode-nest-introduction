import { BadRequestException, type NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware', 'antes')

    if (Number.isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido!')
    }

    console.log('UserIdCheckMiddleware', 'depois')

    next()
  }
}
