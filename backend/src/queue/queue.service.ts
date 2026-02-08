import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class QueueService {
  private client: SQSClient;

  constructor() {
    this.client = new SQSClient({
      region: 'eu-north-1',
      endpoint: process.env.SQS_ENDPOINT,
    });
  }

  async sendMessage(queueUrl: string, body: object) {
    console.log('============',queueUrl, this.client.config.region)
    const res = await this.client.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(body),
      }),
    );
    console.log(">>>> ", res)
  }
}
