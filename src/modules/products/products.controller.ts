import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/common/cloudinary.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe ser menor a 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const imgUrl = await this.cloudinaryService.uploadImage(file);
    if (!imgUrl?.url) {
      return 'Error al subir la imagen a Cloudinary';
    }
    return this.productsService.putImage(imgUrl.url, id);
  }
}

// @Post()
// createProduct(user: IProduct) {
//   return this.productsService.createProduct(user);
// }
// @Post('seeder')
// preloadProducts(){
//   return this.productsService.preloadProduct();
// }
// @Put(':id')
// @UseGuards(AuthGuard)
// putFunction(@Param('id') id: string) {
//   return this.productsService.putFunction(Number(id));
// }

// @Delete('id')
// @UseGuards(AuthGuard)
// deleteProduct(@Param('id') id: string) {
//   return this.productsService.deleteProduct(Number(id));
// }
// }
