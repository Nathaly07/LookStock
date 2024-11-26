import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EncryptionService } from '../utils/encryption.service';

@Module({
  providers: [EmployeeService, EncryptionService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
