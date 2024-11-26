import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid'; 


@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(
    productId: string,
    employeeId: string,
    type: 'Entrada' | 'Salida',
    quantityChange: number,
    comment?: string,
  ): Promise<any> {
    // Verificar existencia del producto y empleado
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });
    const employee = await this.prisma.employees.findUnique({
      where: { id: employeeId },
    });

    if (!product) throw new Error('Producto no encontrado');
    if (!employee) throw new Error('Empleado no encontrado');

    // Actualizar stock del producto
    const updatedStock =
      type === 'Entrada'
        ? product.stock + quantityChange
        : product.stock - quantityChange;

    await this.prisma.products.update({
      where: { id: productId },
      data: { stock: updatedStock },
    });

    // Crear un registro en el log de inventario
    return await this.prisma.inventory_logs.create({
      data: {
        id: uuidv4(),
        products: { connect: { id: productId } }, // Conectar el producto
        employees: { connect: { id: employeeId } }, // Conectar el empleado
        type,
        quantityChange,
        comment: comment || null,
        timestamp: new Date(),
      },
    });
  }

  async getLogs(): Promise<any[]> {
    // Obtener logs con relaciones
    const logs = await this.prisma.inventory_logs.findMany({
      include: {
        products: true, // Usa `products` para incluir la relación de productos
        employees: true, // Usa `employees` para incluir la relación de empleados
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    // Mapear los resultados para devolver datos relevantes
    return logs.map((log) => ({
      productName: log.products.name, // Usa `products` para acceder al producto relacionado
      employeeName: log.employees.name, // Usa `employees` para acceder al empleado relacionado
      type: log.type,
      quantityChange: log.quantityChange,
      comment: log.comment,
      timestamp: log.timestamp,
    }));
    
  }
}
