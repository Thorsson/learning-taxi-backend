import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class CarModule {}
