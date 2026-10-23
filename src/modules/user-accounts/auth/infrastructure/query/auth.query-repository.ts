import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../users/infrastructure/users.repository.ts';
import { MeViewDto } from '../../api/view-dto/me.view-dto.ts';

@Injectable()
export class AuthQueryRepository {
  constructor(private usersRepository: UsersRepository) {}

  async me(userId: string): Promise<MeViewDto> {
    const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

    return MeViewDto.mapToView(user);
  }
}
