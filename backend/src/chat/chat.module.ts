import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthService } from '../auth/auth.service';
import { EncryptionService } from '../utils/encryption.service';

@Module({
  providers: [ChatService, ChatGateway, AuthService, EncryptionService],
})
export class ChatModule {}

