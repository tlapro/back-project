import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './users.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp' })
  date: Date;

  @OneToOne(() => OrderDetail, { cascade: true })
  @JoinColumn({ name: 'order_details_id' })
  orderDetail: OrderDetail;
}
