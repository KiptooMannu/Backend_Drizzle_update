import db from '../drizzle/db';
import { UsersTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for users
export const getUsers = async () => {
    return await db.select().from(UsersTable);
}

export const createUser = async (user: any) => {
    return await db.insert(UsersTable).values(user).returning();
}

export const updateUser = async (id: number, user: any) => {
    console.log('User Info:', user);

    if (!user || Object.keys(user).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(UsersTable).set(user).where(eq(UsersTable.id, id)).returning();
}

export const deleteUser = async (id: number) => {
    return await db.delete(UsersTable).where(eq(UsersTable.id, id)).returning();
}

export const searchUsers = async (fullName: string) => {
    return await db.select().from(UsersTable).where(eq(UsersTable.fullname, fullName));
}
