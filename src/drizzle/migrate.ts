import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './db';
import { sql } from 'drizzle-orm';

async function migration() {
  console.log('======== Migrations started ========');

  try {
    // Add email column if it does not exist
    await db.execute(sql`ALTER TABLE auth_on_users ADD COLUMN IF NOT EXISTS email VARCHAR(255) NOT NULL DEFAULT 'example@example.com';`);
    await db.execute(sql`UPDATE auth_on_users SET email = 'example@example.com' WHERE email IS NULL;`);
    await db.execute(sql`ALTER TABLE auth_on_users ALTER COLUMN email DROP DEFAULT;`);

    console.log('======== Migrations completed ========');
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    console.error('Migration error:', error.message);
  } finally {
    process.exit(0);
  }
}

migration().catch((err) => {
  const error = err as Error; // Cast error to Error type
  console.error('Migration error:', error.message);
  process.exit(1);
});
