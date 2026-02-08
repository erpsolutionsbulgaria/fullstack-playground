import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IngestEventDto } from './dto/ingest-event.dto';
import { IngestService } from './ingest.service';

@Controller('events')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
  @HttpCode(202)
  async ingest(
    @Body() dto: IngestEventDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    const event = {
      id: randomUUID(),
      idempotencyKey: idempotencyKey, // optional
      ...dto,
      receivedAt: new Date().toISOString(),
    };

    await this.ingestService.enqueue(event);
    return { status: 'accepted', eventId: event.id };
  }
}
