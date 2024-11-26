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

  
    const encryptedMessage = await this.encryptionService.encryptData(message);

    return await this.prisma.chats.create({
      data: {
        id: uuidv4(), 
        employees: { connect: { id: uid } },
        message: encryptedMessage,
        timestamp: new Date(),
      },
    });
  }

  async getChatHistory(): Promise<any[]> {
    const messages = await this.prisma.chats.findMany({
      include: {
        employees: true, 
      },
      orderBy: {
        timestamp: 'asc', 
      },
    });

    return Promise.all(
      messages.map(async (msg) => ({
        name: msg.employees.name, 
        message: await this.encryptionService.decryptData(msg.message),
        timestamp: msg.timestamp,
      })),
    );
  }
}
