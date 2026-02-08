import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class IngestService {
  constructor(private readonly queue: QueueService) {}

  async enqueue(event: object) {
    await this.queue.sendMessage(
      process.env.EVENTS_QUEUE_URL!,
      event,
    );
  }
}
