import { Controller, Post, Body, Patch, Param, Get, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: any) {
    return await this.productService.createProduct(productData);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    return await this.productService.getProductById(productId);
  }

  @Patch(':id')
  async updateProduct(@Param('id') productId: string, @Body() updatedData: any) {
    return await this.productService.updateProduct(productId, updatedData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    await this.productService.deleteProduct(productId);
    return { message: 'Producto eliminado correctamente.' };
  }
}
