import { Injectable, NotFoundException } from '@nestjs/common';
import { ICoffee } from './entities/coffee.entity';
import { coffees } from './entities/coffee.mock';

@Injectable()
export class CoffeesService {
  coffees: ICoffee[] = [...coffees];
  
  async findAll() {
    return this.coffees;
  }

  async findOne(id: number) {
    const coffee = this.coffees.find(coffee => coffee.id === id);

    if (!coffee) throw new NotFoundException();

    return coffee;
  }

  // create(createCoffeeDto: CreateCoffeeDto) {
  //   return 'This action adds a new coffee';
  // }

  // update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
  //   return `This action updates a #${id} coffee`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} coffee`;
  // }
}
