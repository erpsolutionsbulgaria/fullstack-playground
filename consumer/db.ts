import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: 'postgres://events:events@localhost:5432/events',
});

// export const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'events',
//   password: 'events',
//   database: 'events',
// });
