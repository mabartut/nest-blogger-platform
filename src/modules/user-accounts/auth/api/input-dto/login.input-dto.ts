import {
  emailConstraints,
  passwordConstraints,
} from '../../../users/domain/user.entity.ts';
import { IsStringWithTrim } from '../../../../../core/decorators/validation/is-string-with-trim.ts';

export class LoginInputDto {
  @IsStringWithTrim(emailConstraints.minLength, emailConstraints.maxLength)
  loginOrEmail: string;
  @IsStringWithTrim(
    passwordConstraints.minLength,
    passwordConstraints.maxLength,
  )
  password: string;
}
