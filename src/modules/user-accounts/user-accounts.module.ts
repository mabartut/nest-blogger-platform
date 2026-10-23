import { Module } from '@nestjs/common';
import { UsersController } from './users/api/users.controller.ts';
import { UsersService } from './users/application/users.service.ts';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/domain/user.entity.ts';
import { UsersRepository } from './users/infrastructure/users.repository.ts';
import { UsersQueryRepository } from './users/infrastructure/query/users.query-repository.ts';
import { AuthController } from './auth/api/auth.controller.ts';
import { AuthQueryRepository } from './auth/infrastructure/query/auth.query-repository.ts';
import { AuthService } from './auth/apllication/auth.service.ts';
import { CryptoService } from './auth/apllication/crypto.service.ts';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    AuthService,
    AuthQueryRepository,
    CryptoService,
    JwtService,
  ],
})
export class UserAccountsModule {}
