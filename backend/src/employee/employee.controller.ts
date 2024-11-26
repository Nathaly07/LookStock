import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from './employee.service';

@Controller('auth')
export class EmployeeController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const { token, ...data } = body;
    const { uid } = await this.authService.validateToken(token);
    return await this.employeeService.registerEmployee(uid, data);
  }

  @Post('login')
  async login(@Body('token') token: string) {
    const { uid } = await this.authService.validateToken(token);

    return await this.employeeService.getEmployeeByUid(uid);
  }
}

