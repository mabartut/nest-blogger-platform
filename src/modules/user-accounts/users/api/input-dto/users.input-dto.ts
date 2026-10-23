import { CreateUserDto } from '../../application/dto/create-user.dto.ts';
import { IsEmail, Length } from 'class-validator';
import {
  emailConstraints,
  loginConstraints,
  passwordConstraints,
} from '../../domain/user.entity.ts';
import { IsStringWithTrim } from '../../../../../core/decorators/validation/is-string-with-trim.ts';

export class CreateUserInputDto implements CreateUserDto {
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  login: string;

  @IsEmail()
  @IsStringWithTrim(emailConstraints.minLength, emailConstraints.maxLength)
  email: string;

  @Length(passwordConstraints.minLength, passwordConstraints.maxLength)
  password: string;
}
