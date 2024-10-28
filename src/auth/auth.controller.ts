import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { UploadedFile, UploadedFiles } from '@nestjs/common/decorators'
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express'
import { User } from '../decorators/user.decorator'
import type { FileService } from '../file/file.service'
import { AuthGuard } from '../guards/auth.guard'
import type { UserEntity } from '../user/entity/user.entity'
import type { AuthService } from './auth.service'
import type { AuthForgetDTO } from './dto/auth-forget.dto'
import type { AuthLoginDTO } from './dto/auth-login.dto'
import type { AuthRegisterDTO } from './dto/auth-register.dto'
import type { AuthResetDTO } from './dto/auth-reset.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body)
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email)
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token)
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user: UserEntity) {
    return user
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user: UserEntity,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 50 }),
        ],
      })
    )
    photo: Express.Multer.File
  ) {
    const filename = `photo-${user.id}.png`

    try {
      await this.fileService.upload(photo, filename)
    } catch (e) {
      throw new BadRequestException(e)
    }

    return photo
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(
    @User() user,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return files
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 10,
      },
    ])
  )
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFilesFields(
    @User() user,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File[] }
  ) {
    return files
  }
}
