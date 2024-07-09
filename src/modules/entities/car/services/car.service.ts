import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../entities/car.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find({
      relations: {
        driver: true,
      },
    });
  }

  async findById(id: number): Promise<Car> {
    let car = await this.carRepository.findOne({
      where: {
        id,
      },
      relations: {
        driver: true,
      },
    });

    if (!car)
      throw new HttpException('Car não encontrado!', HttpStatus.NOT_FOUND);

    return car;
  }

  async create(Car: Car): Promise<Car> {
    return await this.carRepository.save(Car);
  }

  async update(car: Car): Promise<Car> {
    let buscaDriver = await this.findById(car.id);

    if (!buscaDriver || !car.id)
      throw new HttpException('Car não encontrado!', HttpStatus.NOT_FOUND);

    return await this.carRepository.save(car);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaDriver = await this.findById(id);

    if (!buscaDriver)
      throw new HttpException('Car não encontrado', HttpStatus.NOT_FOUND);

    return await this.carRepository.delete(id);
  }
}
