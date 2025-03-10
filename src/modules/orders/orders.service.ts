import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { IOrder } from 'src/interfaces/IOrder';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(order: IOrder) {
    this.ordersRepository.addOrder(order);
  }
}
