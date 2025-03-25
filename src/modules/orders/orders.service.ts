import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { IOrder } from 'src/interfaces/IOrder';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrders() {
    return this.ordersRepository.getAllOrders();
  }

  async addOrder(order: IOrder) {
    await this.ordersRepository.addOrder(order);
  }

  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }
}
