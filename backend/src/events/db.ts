import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: 'postgres://events:events@localhost:5432/events',
});
