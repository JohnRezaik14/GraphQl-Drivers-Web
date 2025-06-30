import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Car } from './car.model';

@ObjectType()
export class Driver {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  age: number;

  @Field(() => [Car])
  cars: Car[];
}
