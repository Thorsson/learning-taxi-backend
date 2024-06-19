import { Injectable } from '@nestjs/common';
import { UserService } from '../../../entities/user/services/user.service';
import { Bcrypt } from '../../bcrypt/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(email);

    if (!user) return null;

    if (await this.bcrypt.compare(password, user.password_hash)) {
      delete user.password_hash;
      return user;
    }
  }
}
