import { Global, Module } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../../entities/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '20m',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Bcrypt, LocalStrategy, JwtStrategy],
  exports: [AuthService, Bcrypt, JwtModule],
})
export class AuthModule {}
