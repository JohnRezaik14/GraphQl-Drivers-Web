import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from 'src/models/driver.model';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private DriverModel: Model<Driver>) {}
  async findDriver(id: string) {
    try {
      const driver = await this.DriverModel.findById(id);
      return driver;
    } catch (error) {
      throw new NotFoundException(`Driver with id : ${id} not found`);
    }
  }
  async findAll() {
    try {
      const drivers = await this.DriverModel.find().select('-id -__v');
      if (drivers) {
        return drivers;
      } else {
        return 'no drivers found';
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createDriver(body: { name: string; age: number }) {
    try {
      const driver = await this.DriverModel.create(body);
      if (driver) {
        driver.save();
        return driver;
      }
    } catch (error) {
      throw new BadRequestException('Can not create driver now');
    }
  }
}
