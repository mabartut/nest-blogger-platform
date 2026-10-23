import { UserDocument } from '../../../users/domain/user.entity.ts';

export class MeViewDto {
  login: string;
  email: string;
  userId: string;

  static mapToView(user: UserDocument): MeViewDto {
    const dto = new MeViewDto();

    dto.email = user.email;
    dto.login = user.login;
    dto.userId = user._id.toString();

    return dto;
  }
}
