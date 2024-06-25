import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@Entity({ name: 'tb_drivers' })
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  first_name: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  last_name: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  driver_location: string;

  @UpdateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @IsNotEmpty()
  @Column({ nullable: false })
  average_rating: number;

  @OneToOne(() => Car, (car) => car.driver)
  @JoinColumn()
  car: Car;
}
