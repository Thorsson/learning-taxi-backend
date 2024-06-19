import { Module } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserModule } from '../../entities/user/user.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, Bcrypt, LocalStrategy],
  exports: [],
})
export class AuthModule {}
