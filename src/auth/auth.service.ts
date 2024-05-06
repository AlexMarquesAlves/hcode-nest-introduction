import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    // return this.JWTService.sign()
  }

  async checkToken(token: string) {
    // return this.JWTService.verify(token)
  }

  async login(email: string, password: string) {
    this.prisma.user.findFirst({
      where: { email, password },
    })
  }

  async forget() {}

  async reset() {}
}
