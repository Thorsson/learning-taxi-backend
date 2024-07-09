import { Injectable } from '@nestjs/common';
import { Bcrypt } from '../../bcrypt/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../entities/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcrypt: Bcrypt,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: User, password: string): Promise<boolean> {
    if (user && (await this.bcrypt.compare(password, user.password_hash)))
      return true;

    return false;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string) {
    return await this.bcrypt.hashPassword(password);
  }
}
