import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from 'src/entities/category.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from 'src/common/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CategoriesModule],
  providers: [
    ProductsService,
    ProductsRepository,
    CloudinaryConfig,
    CloudinaryService,
  ],
  controllers: [ProductsController],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
