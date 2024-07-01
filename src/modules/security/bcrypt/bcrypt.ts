import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async hash(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async getSalt() {
    return await bcrypt.genSalt(10);
  }

  async hashPassword(password: string) {
    const password_salt = await this.getSalt();
    const password_hash = await this.hash(password, password_salt);
    return { password_hash, password_salt };
  }
}
