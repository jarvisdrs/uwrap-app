import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return this.appService.getHealth();
  }

  @Get()
  getRoot(): { status: string; message: string } {
    return { status: 'ok', message: 'uWrap API is running' };
  }
}
