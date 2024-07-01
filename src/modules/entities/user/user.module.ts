import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entity/user.entity';
import { Bcrypt } from '../../security/bcrypt/bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, Bcrypt],
  exports: [UserService],
})
export class UserModule {}
