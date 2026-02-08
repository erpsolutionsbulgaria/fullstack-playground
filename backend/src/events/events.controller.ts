import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents(
    @Query('type') type?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit = '50',
  ) {
    return this.eventsService.findAll({
      type,
      from,
      to,
      limit: Math.min(Number(limit), 100),
    });
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Get('stats/by-type')
  async stats() {
    return this.eventsService.statsByType();
  }
}
