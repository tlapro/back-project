import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { OrderDetailRepository } from './orderDetail.repository';
import { ProductsRepository } from '../products/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [
    OrdersService,
    OrdersRepository,
    OrderDetailRepository,
    ProductsRepository,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
