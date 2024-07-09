import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class UserResetPasswordDto {
  @ApiProperty({
    description: 'The current password of the user',
    example: 'password123',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Confirm password is required.' })
  @Length(8, 16)
  currentPassword: string;

  @ApiProperty({
    description: 'The new password of the user',
    example: 'senha123',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'New password is required.' })
  @Length(8, 16)
  newPassword: string;
}
