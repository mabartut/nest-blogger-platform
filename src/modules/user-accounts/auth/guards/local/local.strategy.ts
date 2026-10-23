import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../apllication/auth.service.ts';
import { UserContextDto } from '../dto/user-context.dto.ts';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'loginOrEmail' });
  }

  async validate(
    loginOrEmail: string,
    password: string,
  ): Promise<UserContextDto> {
    const userContext = await this.authService.validateUser({
      loginOrEmail,
      password,
    });

    if (!userContext) {
      throw new UnauthorizedException();
    }

    return userContext;
  }
}
