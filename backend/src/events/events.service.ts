import { Injectable } from '@nestjs/common';
import { pool } from './db';

@Injectable()
export class EventsService {
  async findAll(params: {
    type?: string;
    from?: string;
    to?: string;
    limit: number;
  }) {
    const conditions: string[] = [];
    const values: any[] = [];

    if (params.type) {
      values.push(params.type);
      conditions.push(`type = $${values.length}`);
    }

    if (params.from) {
      values.push(params.from);
      conditions.push(`occurred_at >= $${values.length}`);
    }

    if (params.to) {
      values.push(params.to);
      conditions.push(`occurred_at <= $${values.length}`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    values.push(params.limit);

    const query = `
      SELECT id, type, source, occurred_at, received_at, properties
      FROM events
      ${whereClause}
      ORDER BY occurred_at DESC
      LIMIT $${values.length}
    `;

    const result = await pool.query(query, values);
    return result.rows;
  }

  async findById(id: string) {
    const result = await pool.query(
      `
      SELECT id, type, source, occurred_at, received_at, properties
      FROM events
      WHERE id = $1
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async statsByType() {
    const result = await pool.query(`
      SELECT type, COUNT(*)::int AS count
      FROM events
      GROUP BY type
      ORDER BY count DESC
    `);

    return result.rows;
  }
}
