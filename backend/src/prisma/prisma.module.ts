import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Permite que el servicio esté disponible en toda la aplicación sin necesidad de importarlo en cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta el servicio para que otros módulos lo usen
})
export class PrismaModule {}
