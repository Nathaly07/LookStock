import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../utils/encryption.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async saveMessage(uid: string, message: string): Promise<any> {
    const employee = await this.prisma.employees.findUnique({
      where: { id: uid },
    });
    if (!employee) throw new Error('Empleado no encontrado');

    // Encriptar el mensaje antes de guardarlo
    const encryptedMessage = this.encryptionService.encryptData(message);

    return await this.prisma.chats.create({
      data: {
        id: uuidv4(),
        employees: { connect: { id: uid } },
        message: encryptedMessage,
        timestamp: new Date(),
      },
      include: {
        employees: true, // Incluir la información del empleado en el mensaje
      },
    });
  }

  async getChatHistory(): Promise<any[]> {
    const messages = await this.prisma.chats.findMany({
      include: { employees: true }, // Incluir la relación con el empleado
      orderBy: { timestamp: 'asc' },
    });

    // Descifrar los mensajes y mapear la información
    return Promise.all(
      messages.map(async (msg) => ({
        name: msg.employees.name,
        message: this.encryptionService.decryptData(msg.message),
        timestamp: msg.timestamp,
      })),
    );
  }
}
