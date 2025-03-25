import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { ProductsRepository } from '../products/products.repository';
import { IOrder } from 'src/interfaces/IOrder';
import { OrderDetailRepository } from './orderDetail.repository';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly productsRepository: ProductsRepository,
    private readonly orderDetailsRepository: OrderDetailRepository,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({
      relations: ['orderDetail', 'orderDetail.products'],
    });
  }

  async addOrder(order: IOrder) {
    if (!order.userId || !order.products || order.products.length === 0) {
      throw new Error(
        'Faltan datos en la petición o la lista de productos está vacía.',
      );
    }
    const products: Product[] = [];
    let totalPrice = 0;

    for (const productId of order.products) {
      const product = await this.productsRepository.getProductById(productId);

      if (!product || product.stock <= 0) {
        continue;
      }

      product.stock -= 1;
      await this.productsRepository.saveProduct(product);
      console.log(product.name);
      console.log(
        `Tipo de product.price: ${typeof product.price}, Valor: ${product.price}`,
      );

      totalPrice += Number(product.price);

      products.push(product);
    }

    if (products.length === 0) {
      throw new Error('No hay productos con stock disponible.');
    }

    const orderDetail = new OrderDetail();
    orderDetail.products = products;
    orderDetail.price = parseFloat(totalPrice.toFixed(2));
    console.log(`Precio total de la orden: ${orderDetail.price}`);
    if (!orderDetail.price || isNaN(orderDetail.price)) {
      throw new Error('El precio total no es válido.');
    }

    const savedOrderDetail =
      await this.orderDetailsRepository.saveOrderDetail(orderDetail);
    if (!savedOrderDetail) {
      throw new Error('Error al guardar los detalles de la orden');
    }
    const newOrder = this.ordersRepository.create({
      user: { id: order.userId },
      date: new Date(),
      orderDetail: savedOrderDetail,
    });

    return this.ordersRepository.save(newOrder);
  }
  async getOrderById(id: string) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    return order;
  }
}
