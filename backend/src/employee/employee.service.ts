import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async registerEmployee(uid: string, employeeData: any): Promise<any> {
    return await this.prisma.employees.create({
      data: {
        id: uid,
        name: employeeData.name,
        role: employeeData.role,
        phone: employeeData.phone,
        photo: employeeData.photo || null,
        isActive: true,
        creationDate: new Date(),
      },
    });
  }

  async getEmployeeByUid(uid: string): Promise<any> {
    const employee = await this.prisma.employees.findUnique({ where: { id: uid } });
    if (!employee) throw new Error('Usuario no encontrado');
    return {employee};
  }
}


