import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CarService } from '../car/services/car.service';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    private carService: CarService,
  ) {}

  async findaAll(): Promise<Driver[]> {
    return await this.driverRepository.find({
      relations: {
        car: true,
      },
    });
  }

  async findById(id: number): Promise<Driver> {
    let postagem = await this.driverRepository.findOne({
      where: {
        id,
      },
      relations: {
        car: true,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem nao encontrada!', HttpStatus.NOT_FOUND);
    return postagem;
  }

  async findByLocation(titulo: string): Promise<Driver[]> {
    throw new Error('implementation missing');
    // return await this.driverRepository.find({
    //   // where: {
    //   //   titulo: ILike(`%${titulo}%`),
    //   // },
    //   // relations: {
    //   //   car: true,
    //   // },
    // });
  }

  async create(driver: Driver): Promise<Driver> {
    if (driver.car) {
      let car = await this.carService.findById(driver.car.id);

      if (!car) throw new HttpException('Car not FOUND!', HttpStatus.NOT_FOUND);
    }
    return await this.driverRepository.save(driver);
  }

  async update(driver: Driver): Promise<Driver> {
    let buscaDriver: Driver = await this.findById(driver.id);

    if (!buscaDriver || !driver.id)
      throw new HttpException('Driver not found!', HttpStatus.NOT_FOUND);

    if (driver.car) {
      let car = await this.carService.findById(driver.car.id);

      if (!car)
        throw new HttpException('Driver not found!', HttpStatus.NOT_FOUND);
    }

    return await this.driverRepository.save(driver);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaDriver: Driver = await this.findById(id);

    if (!buscaDriver)
      throw new HttpException('Driver not found!', HttpStatus.NOT_FOUND);

    return await this.driverRepository.delete(id);
  }
}
