import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.create.dto';
import { IsEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmpty({
    message:
      'You should not update password here, use password update endpoint.',
  })
  password?: string;
}
