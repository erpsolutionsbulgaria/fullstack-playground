import { Client } from 'pg';

(async () => {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'events',
    password: 'events',
    database: 'events',
  });

  await client.connect();
  console.log('CONNECTED TO POSTGRES');
  const res = await client.query('SELECT current_user, inet_server_addr()');
  console.log(res.rows);
  await client.end();
})();
