import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { IngestModule } from './ingest/ingest.module';
import { QueueModule } from './queue/queue.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    IngestModule,
    QueueModule,
    EventsModule,
  ],
})
export class AppModule {}
