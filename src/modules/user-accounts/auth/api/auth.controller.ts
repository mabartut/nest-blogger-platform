import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExtractUserIdFromRequest } from '../guards/decorators/param/extract-userId-from-request.decorator.ts';
import { LocalAuthGuard } from '../guards/local/local-auth.guard.ts';
import { LoginViewDto } from './view-dto/login.view-dto.ts';
import { AuthService } from '../apllication/auth.service.ts';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/bearer/jwt-auth.guard.ts';
import { MeViewDto } from './view-dto/me.view-dto.ts';
import { AuthQueryRepository } from '../infrastructure/query/auth.query-repository.ts';

@Controller('auth')
export class AuthController {
  constructor(
    private authQueryRepository: AuthQueryRepository,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        loginOrEmail: { type: 'string', example: 'login123' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  login(@ExtractUserIdFromRequest() userId: string): LoginViewDto {
    return this.authService.login(userId);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@ExtractUserIdFromRequest() userId: string): Promise<MeViewDto> {
    return this.authQueryRepository.me(userId);
  }
}
