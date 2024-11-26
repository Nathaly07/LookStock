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

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;
      if (!token) throw new Error('Token no proporcionado');

      const uid = await this.authService.validateToken(token);
      this.connectedUsers.set(client.id, uid);
    } catch (error) {
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

    this.server.emit('receiveMessage', {
      name: message.employee.name,
      message: await this.chatService.getChatHistory(),
      timestamp: message.timestamp,
    });
  }
}
