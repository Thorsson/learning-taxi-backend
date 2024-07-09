import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class DriverModule {}
