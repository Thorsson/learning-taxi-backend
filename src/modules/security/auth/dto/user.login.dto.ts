import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../../entities/user/dto/user.create.dto';

export class UserLoginDto extends PartialType(
  OmitType(CreateUserDto, [
    'first_name',
    'last_name',
    'address',
    'phone_number',
  ]),
) {}
