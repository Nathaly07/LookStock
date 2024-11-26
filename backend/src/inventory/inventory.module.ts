import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryLogController } from './inventory.controller';

@Module({
  providers: [InventoryService],
  controllers: [InventoryLogController],
})
export class InventoryLogModule {}

