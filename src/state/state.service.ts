import db from '../drizzle/db';
import { StateTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for states
export const getStates = async () => {
    return await db.select().from(StateTable);
}

export const createState = async (state: any) => {
    return await db.insert(StateTable).values(state).returning();
}

export const updateState = async (id: number, state: any) => {
    if (!state || Object.keys(state).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(StateTable).set(state).where(eq(StateTable.id, id)).returning();
}

export const deleteState = async (id: number) => {
    return await db.delete(StateTable).where(eq(StateTable.id, id)).returning();
}

export const searchStates = async (name: string) => {
    return await db.select().from(StateTable).where(eq(StateTable.name, name));
}
