import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Name, NameSchema } from './name.schema.ts';
import { HydratedDocument, Model } from 'mongoose';
import { CreateUserDomainDto } from './dto/create-user.domain.dto.ts';

export const loginConstraints = {
  minLength: 3,
  maxLength: 10,
};

export const passwordConstraints = {
  minLength: 6,
  maxLength: 20,
};

export const emailConstraints = {
  minLength: 3,
  maxLength: 254,
};

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, ...loginConstraints })
  login: string;

  @Prop({ type: String, required: true, ...emailConstraints })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: Boolean, required: true, default: false })
  isEmailConfirmed: boolean;

  @Prop({ type: NameSchema })
  name: Name;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  makeDeleted() {
    if (this.deletedAt !== null) {
      throw new Error('User has already been deleted.');
    }
    this.deletedAt = new Date();
  }

  static createUser(
    this: UserModelType,
    dto: CreateUserDomainDto,
  ): UserDocument {
    const user = new this();

    user.login = dto.login;
    user.email = dto.email;
    user.passwordHash = dto.passwordHash;
    user.isEmailConfirmed = false;

    return user;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ login: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModelType = Model<UserDocument> & typeof User;
