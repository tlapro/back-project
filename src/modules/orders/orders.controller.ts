import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from 'src/interfaces/IOrder';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: IOrder) {
    return this.ordersService.addOrder(order);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrdersById(@Param() id: string) {
    return this.ordersService.getOrderById(id);
  }
}
