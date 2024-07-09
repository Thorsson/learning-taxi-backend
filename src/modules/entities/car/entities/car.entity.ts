import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';

@Entity({ name: 'tb_cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  license_plate: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  condition: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  model_name: string;

  @Column({ nullable: false })
  model_year: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Driver, (driver) => driver.car)
  driver: Driver;
}
