import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Car } from 'src/models/car.model';
import { CarService } from './car.service';

@Resolver(() => Car)
export class CarResolver {
  constructor(private carService: CarService) {}

  @Query(() => Car)
  car(@Args('id', { type: () => ID }) id: string) {
    return this.carService.getCar(id);
  }
}
