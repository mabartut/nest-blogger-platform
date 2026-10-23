import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { UserDocument, UserModelType } from '../domain/user.entity.ts';
import { User } from '../domain/user.entity.ts';
import type { QueryFilter } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ _id: id, deletedAt: null });
  }

  async findByIdOrNotFoundFail(id: string): Promise<UserDocument> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByOrNotFoundFail(
    query: QueryFilter<UserDocument>,
  ): Promise<UserDocument> {
    if (Object.keys(query).length === 0) {
      throw new Error('Empty lookup query');
    }
    const user = await this.UserModel.findOne({ ...query, deletedAt: null });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
  }

  async save(user: UserDocument): Promise<void> {
    await user.save();
  }
}
