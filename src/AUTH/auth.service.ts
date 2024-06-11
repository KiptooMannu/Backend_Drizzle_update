import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {db} from '../drizzle/db'; // Ensure this path is correct and matches your actual setup
import { UsersTable, TIUser, TSUser } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { userSchema, loginSchema } from '../validator'; // Ensure these schemas are correctly defined and imported
import { sql } from 'drizzle-orm'; // Import the sql tag

const secret = process.env.SECRET!;
const expiresIn = process.env.EXPIRES!;

export const registerUser = async (user: TIUser) => {
  // Validate user data against the Users schema
  userSchema.parse(user);

  // Ensure fullname and phone are defined
  if (!user.fullname || !user.phone) {
    throw new Error('Fullname and phone must be provided');
  }

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(UsersTable)
    .where(and(eq(UsersTable.fullname, user.fullname), eq(UsersTable.phone, user.phone)))
    .execute();

  if (existingUser.length > 0) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Insert data into the Users table
  const newUser = await db
    .insert(UsersTable)
    .values({
      fullname: user.fullname,
      address: user.address || null,
      score: user.score || 0,
      phone: user.phone || null,
      contact_phone: user.contact_phone,
      email: user.email,
      password: hashedPassword,
      created_at: sql`CURRENT_TIMESTAMP` as unknown as string,
      updated_at: sql`CURRENT_TIMESTAMP` as unknown as string
    })
    .returning({ id: UsersTable.id })
    .execute();

  return 'User registered successfully';
};

export const loginUser = async (email: string, password: string) => {
  // Validate login data against the login schema
  loginSchema.parse({ email, password });

  const user = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email))
    .execute();

  if (!user || user.length === 0) {
    throw new Error('Invalid credentials! Try again');
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials! Try again');
  }

  const token = jwt.sign({ id: user[0].id, email: user[0].email }, secret, { expiresIn });

  return { token, user: user[0] };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
