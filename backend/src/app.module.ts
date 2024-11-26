import { Module } from '@nestjs/common';
import {PrismaModule} from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { InventoryLogModule } from './inventory/inventory.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmployeeModule,
    ProductModule,
    InventoryLogModule,
    ChatModule,
  ],
})
export class AppModule {}


