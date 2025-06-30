import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/models/car.model';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private CarModel: Model<Car>) {}
  async getCar(id: string) {
    try {
      const car = this.CarModel.findById(id);
      return car;
    } catch (error) {
      throw new NotFoundException(`Car with id ${id} not found `);
    }
  }
  async findAll(id: string) {
    try {
      const cars = await this.CarModel.find({ driverId: id });
      return cars;
    } catch (error) {
      throw new NotFoundException(`Driver with id : ${id} is not valid`);
    }
  }
  async addCar(body: { name: string; model: string }) {
    try {
      const car = await this.CarModel.create(body);
      await car.save();
    } catch (error) {
      throw new ConflictException('Car an not be created');
    }
  }
}
