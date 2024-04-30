import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return String(`Hello World! from '${process.env.NODE_ENV}'`)
  }
}
