import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { ChatService } from './chat.service';
import { EncryptionService } from '../utils/encryption.service';


@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
    private readonly encryptionService: EncryptionService,

  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;
      if (!token) throw new Error('Token no proporcionado');

      const { uid } = await this.authService.validateToken(token);
      this.connectedUsers.set(client.id, uid);

      // Enviar historial de mensajes al cliente conectado
      const chatHistory = await this.chatService.getChatHistory();
      client.emit('loadMessages', chatHistory);
    } catch (error) {
      console.error('Error en la conexión:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { message: string }) {
    const uid = this.connectedUsers.get(client.id);
    if (!uid) {
      client.disconnect();
      return;
    }

    const message = await this.chatService.saveMessage(uid, payload.message);

    // Emitir el mensaje nuevo a todos los clientes conectados
    this.server.emit('receiveMessage', {
      name: message.employees.name,
      message: this.encryptionService.decryptData(message.message),
      timestamp: message.timestamp,
    });
  }
}

