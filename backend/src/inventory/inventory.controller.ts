import { Controller, Post, Body, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory-logs')
export class InventoryLogController {
  constructor(private readonly inventoryLogService: InventoryService) {}

  @Post()
  async createLog(@Body() logData: any) {
    const { productId, employeeId, type, quantityChange, comment } = logData;
    return await this.inventoryLogService.createLog(productId, employeeId, type, quantityChange, comment);
  }

  @Get()
  async getLogs() {
    return await this.inventoryLogService.getLogs();
  }
}
