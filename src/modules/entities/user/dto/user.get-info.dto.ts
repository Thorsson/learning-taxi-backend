import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserGetInfoDto extends PartialType(
  OmitType(User, ['password_hash', 'password_salt']),
) {}
