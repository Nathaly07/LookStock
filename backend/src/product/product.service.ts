import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid'; 


@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(productData: any): Promise<any> {
    // Crear un producto directamente con Prisma
    return await this.prisma.products.create({
      data: {
        id: uuidv4(), // Generar ID automáticamente si no se proporciona
        name: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
        image: productData.image || null,
        addedDate: new Date(),
      },
    });
    
  }

  async updateProduct(productId: string, updatedData: any): Promise<any> {
    const { stock, ...dataWithoutStock } = updatedData; 
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error('Producto no encontrado');

    return await this.prisma.products.update({
      where: { id: productId },
      data: dataWithoutStock, 
    });
  }

  async deleteProduct(productId: string): Promise<any> {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error('Producto no encontrado');

    return await this.prisma.products.delete({
      where: { id: productId },
    });
  }
  async getProductById(productId: string): Promise<any> {
    // Buscar un producto por su ID
    return await this.prisma.products.findUnique({
      where: { id: productId },
    });
  }

  async getAllProducts(): Promise<any[]> {
    // Obtener todos los productos
    return await this.prisma.products.findMany();
  }
}
