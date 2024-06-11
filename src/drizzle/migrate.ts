import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import db, { client } from './db';
import { sql } from 'drizzle-orm';

async function migration() {
  console.log('======== Migrations started ========');

  try {
    // Add phone_verified column if it does not exist
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE;`);

    // Add email_verified column if it does not exist
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;`);

    // Step 1: Add the contact_phone column with a default value
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(15) DEFAULT 'unknown';`);

    // Step 1: Add the email column with a default value
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(100) DEFAULT 'unknown@example.com';`);

    // Add the password column with a default value
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255) DEFAULT 'default_password';`);

     // Step 1: Add the confirmation_code column with a default value
     await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS confirmation_code VARCHAR(6) DEFAULT '000000';`);

     // Add the created_at column with a default value
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);

      // Add the updated_at column with a default value
      await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);
      
    // Step 2: Update existing rows to have a proper contact_phone value if needed
    await db.execute(sql`UPDATE users SET contact_phone = '1234567890' WHERE contact_phone = 'unknown';`);

    // Step 3: Alter the column to remove the default and make it NOT NULL
    await db.execute(sql`ALTER TABLE users ALTER COLUMN contact_phone SET NOT NULL;`);
    await db.execute(sql`ALTER TABLE users ALTER COLUMN contact_phone DROP DEFAULT;`);

    console.log('======== Migrations completed ========');
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    console.error('Migration error:', error.message);
  } finally {
    await client.end();
    process.exit(0);
  }
}

migration().catch((err) => {
  const error = err as Error; // Cast error to Error type
  console.error('Migration error:', error.message);
  process.exit(1);
});
