import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Car } from 'src/models/car.model';
import { CarSchema } from 'src/schemas/car.schema';

@Module({
  providers: [CarService, CarResolver],
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  exports: [CarService],
})
export class CarModule {}
