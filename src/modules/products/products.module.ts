import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CategoriesModule],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
