import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { UserModelType } from '../../domain/user.entity.ts';
import { User } from '../../domain/user.entity.ts';
import { UserViewDto } from '../../api/view-dto/users.view-dto.ts';
import { GetUsersQueryParams } from '../../api/input-dto/get-users-query-params.input-dto.ts';
import { PaginatedViewDto } from '../../../../../core/dto/base.paginated.view-dto.ts';
import { QueryFilter } from 'mongoose';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}

  async getByIdOrNotFoundFail(id: string): Promise<UserViewDto> {
    const user = await this.UserModel.findOne({
      _id: id,
      deletedAt: null,
    }).lean();

    if (!user) throw new NotFoundException('User not found');

    return UserViewDto.mapToView(user);
  }

  async getAll(
    query: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    const filter: QueryFilter<User> = {
      deletedAt: null,
    };

    if (query.searchLoginTerm) {
      filter.$or = filter.$or || [];
      filter.$or.push({
        login: { $regex: query.searchLoginTerm, $options: 'i' },
      });
    }
    if (query.searchEmailTerm) {
      filter.$or = filter.$or || [];
      filter.$or.push({
        email: { $regex: query.searchEmailTerm, $options: 'i' },
      });
    }

    const [users, totalCount] = await Promise.all([
      this.UserModel.find(filter)
        .sort({ [query.sortBy]: query.sortDirection })
        .skip(query.calculateSkip())
        .limit(query.pageSize),

      this.UserModel.countDocuments(filter),
    ]);

    const items = users.map(UserViewDto.mapToView);

    return PaginatedViewDto.mapToView({
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items,
    });
  }
}
