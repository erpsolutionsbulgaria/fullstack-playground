import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  health() {
    console.clear();
    return { status: 'ok' };
  }
}
