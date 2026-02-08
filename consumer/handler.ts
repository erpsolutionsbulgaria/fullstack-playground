import { pool } from "./db";

export async function handler(record: any) {
  // console.log('RECORD >>> ', typeof record, record.Body, record.body)
  const event = JSON.parse(record.Body);

  // Simulate processing
  console.log('Processing event:', {
    id: event.id,
    type: event.type,
    source: event.source,
    occurredAt: event.occurredAt,
  });

   console.log("EVENT TYPE >> ", event.type)
  // Simulate failure for learning later
  if (event.type === 'fail_test') {
    throw new Error('Simulated processing failure');
  }

    const query = `
    INSERT INTO events (id, type, source, occurred_at, received_at, properties, idempotency_key)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO NOTHING
  `;

  console.log("EVENT >>> ", event);

  await pool.query(query, [
    event.id,
    event.type,
    event.source,
    event.occurredAt,
    event.receivedAt,
    event.properties,
    event.idempotencyKey
  ]);

  console.log(`Event ${event.id} stored`);

}
