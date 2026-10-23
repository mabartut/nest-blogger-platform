import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../application/users.service.ts';
import { UsersQueryRepository } from '../infrastructure/query/users.query-repository.ts';
import { CreateUserInputDto } from './input-dto/users.input-dto.ts';
import { GetUsersQueryParams } from './input-dto/get-users-query-params.input-dto.ts';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto.ts';
import { UserViewDto } from './view-dto/users.view-dto.ts';

// @ApiBasicAuth()
// @UseGuards(BasicAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
  ) {}

  @Get()
  async getAll(
    @Query() query: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    // return this.usersQueryRepository.getAll(query);

    //@ts-ignore
    return 1234;
  }

  @Post()
  async createUser(@Body() body: CreateUserInputDto) {
    const userId = await this.usersService.createUser(body);

    return this.usersQueryRepository.getByIdOrNotFoundFail(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
