import 'dotenv/config';
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { handler } from './handler';

const client = new SQSClient({
  region: process.env.AWS_REGION!,
  endpoint: process.env.SQS_ENDPOINT,
});

const QUEUE_URL = process.env.EVENTS_QUEUE_URL!;

async function poll() {
  const response = await client.send(
    new ReceiveMessageCommand({
      QueueUrl: QUEUE_URL,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 10,
    }),
  );

  console.log('BOILER>>>>> ', response.Messages)
  if (!response.Messages) return;

  for (const message of response.Messages) {
    try {
      console.log("BAHURKA ======>>>> ", message)
      await handler(message);

      await client.send(
        new DeleteMessageCommand({
          QueueUrl: QUEUE_URL,
          ReceiptHandle: message.ReceiptHandle!,
        }),
      );
    } catch (err) {
      console.error('Processing failed:', err);
      // Do NOT delete message → retry later
    }
  }
}

async function start() {
  console.log('Consumer started');
  while (true) {
    await poll();
  }
}

start();
