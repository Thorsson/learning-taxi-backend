import { Injectable } from '@nestjs/common';
import { UserService } from '../../../entities/user/services/user.service';
import { Bcrypt } from '../../bcrypt/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcrypt: Bcrypt,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(email);

    if (!user) return null;
    if (await this.bcrypt.compare(password, user.password_hash)) {
      delete user.password_hash;
      return user;
    }
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async profileInfo(id: number) {
    return await this.userService.findOneById(id);
  }
}
