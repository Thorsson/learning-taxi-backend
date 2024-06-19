import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.create.dto';
import { UpdateUserDto } from '../dto/user.update.dto';
import { Bcrypt } from '../../../security/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcrypt: Bcrypt,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkEmailExist(createUserDto.email);
    await this.checkPhoneExist(createUserDto.phone_number);

    const { password_hash, password_salt } = await this.hashPassword(
      createUserDto.password,
    );

    return await this.userRepository.save({
      password_hash,
      password_salt,
      ...createUserDto,
    });
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByMail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByPhone(phone: string, withPassword = false) {
    if (withPassword)
      return await this.userRepository
        .createQueryBuilder()
        .addSelect('password_hash')
        .where('phone_number = :phone', { phone })
        .getOne();

    return await this.userRepository.findOne({
      where: { phone_number: phone },
    });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.find({
      where: { first_name: username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.checkIDExist(id);
    if (updateUserDto.email)
      await this.checkEmailExist(updateUserDto.email, id);
    if (updateUserDto.phone_number)
      await this.checkPhoneExist(updateUserDto.phone_number, id);

    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.checkIDExist(id);
    return await this.userRepository.delete(id);
  }

  async updatePassword(id: number, password: string) {
    const { password_hash, password_salt } = await this.hashPassword(password);

    await this.userRepository.update(id, {
      password_hash,
      password_salt,
    });

    return {
      message: 'Password updated',
      success: true,
    };
  }

  async hashPassword(password: string) {
    const password_salt = await this.bcrypt.getSalt();
    const password_hash = await this.bcrypt.hash(password, password_salt);
    return { password_hash, password_salt };
  }

  async checkIDExist(id: number) {
    const checkID = await this.userRepository.findOne({ where: { id } });
    if (!checkID)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async checkEmailExist(email: string, id?: number) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (id && checkEmail.id === id) return;
    if (checkEmail)
      throw new HttpException('Email already used.', HttpStatus.BAD_REQUEST);
  }

  async checkPhoneExist(phone: string, id?: number) {
    const checkPhone = await this.userRepository.findOne({
      where: { phone_number: phone },
    });

    if (id && checkPhone.id === id) return;
    if (checkPhone)
      throw new HttpException('Phone already used.', HttpStatus.BAD_REQUEST);
  }

  async validateUser(email: string, phone?: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('email = :email', { email })
      .orWhere('phone_number = :phone', { phone })
      .addSelect('user.password_hash')
      .getOne();
  }
}
