import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Driver } from 'src/models/driver.model';
import { DriverService } from './driver.service';
import { CarService } from '../car/car.service';

@Resolver(() => Driver)
export class DriverResolver {
  constructor(
    private driverService: DriverService,
    private carService: CarService,
  ) {}

  @Query(() => [Driver], { name: 'drivers', description: 'get all drivers' })
  async getAllDrivers() {
    return this.driverService.findAll();
  }
  @Query(() => Driver, { name: 'driver', description: 'get driver by id' })
  async driver(@Args('id', { type: () => ID }) id: string) {
    return this.driverService.findDriver(id);
  }
  @ResolveField()
  async cars(@Parent() driver: Driver) {
    const { id } = driver;
    return this.carService.findAll(id);
  }

  @Mutation(() => Driver)
  async createDriver(@Args('name') name: string, @Args('age') age: number) {
    return this.driverService.createDriver({ name, age });
  }
}
