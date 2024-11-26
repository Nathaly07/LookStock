import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS
  app.enableCors();

  // Iniciar servidor en el puerto 3000
  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
}
bootstrap();

