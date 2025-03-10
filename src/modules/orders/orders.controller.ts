import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from 'src/interfaces/IOrder';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addOrder(@Body() order: IOrder) {
    return this.ordersService.addOrder(order);
  }
}
