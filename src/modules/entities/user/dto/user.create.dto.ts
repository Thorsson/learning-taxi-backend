import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'First name is required.' })
  first_name: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Last name is required.' })
  last_name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'JonDoe@example.com',
    format: 'email',
    uniqueItems: true,
  })
  @IsEmail({}, { message: 'Please, enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+551234567890',
    uniqueItems: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Phone number is required.' })
  phone_number: string;

  /* We'll receive the password as plain text, generate a new salt and hash it */
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Password is required.' })
  @Length(8, 16)
  password: string;

  /* It's necessary valid the address ? */
  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main Street, Anytown USA',
  })
  @IsOptional()
  @IsNotEmpty()
  address: string;
}
