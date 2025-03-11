import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/entities/orderDetail.entity';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async saveOrderDetail(order: OrderDetail): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create({
      price: order.price,
      products: order.products,
    });

    return await this.orderDetailRepository.save(orderDetail);
  }
}
