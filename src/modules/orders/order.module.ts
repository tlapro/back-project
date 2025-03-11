import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { OrderDetailRepository } from './orderDetail.repository';
import { Order } from 'src/entities/orders.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    ProductsModule,
    CategoriesModule,
  ],
  providers: [OrdersService, OrdersRepository, OrderDetailRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
