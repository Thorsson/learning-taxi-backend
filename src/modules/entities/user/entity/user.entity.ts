import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  first_name: string;

  @ApiProperty()
  @Column()
  last_name: string;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  phone_number: string;

  @ApiProperty()
  @Column({ nullable: true })
  confirmed_at: Date;

  @ApiProperty()
  @Column({ select: false })
  password_salt: string;

  @ApiProperty()
  @Column({ select: false })
  password_hash: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  emailLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
