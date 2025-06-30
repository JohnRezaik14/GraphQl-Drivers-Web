import { Module } from '@nestjs/common';
import { DriverResolver } from './driver.resolver';
import { DriverService } from './driver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver } from 'src/models/driver.model';
import { DriverSchema } from 'src/schemas/driver.schema';
import { CarService } from '../car/car.service';
import { CarModule } from '../car/car.module';

@Module({
  providers: [DriverService, DriverResolver],
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    CarModule,
  ],
})
export class DriverModule {}
