import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Create a new client instance
export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const db = drizzle(client);

export default db;

