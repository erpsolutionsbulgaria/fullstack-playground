import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';

@Module({
  providers: [QueueService],
  exports: [QueueService], // 👈 IMPORTANT
})
export class QueueModule {}
