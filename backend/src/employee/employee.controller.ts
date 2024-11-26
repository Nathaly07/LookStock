import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async register(@Body() employeeData: any) {
    const { uid, ...data } = employeeData;
    return await this.employeeService.registerEmployee(uid, data);
  }

  @Get(':uid')
  async getEmployee(@Param('uid') uid: string) {
    return await this.employeeService.getEmployeeByUid(uid);
  }
}
