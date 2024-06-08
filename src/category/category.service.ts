import db from '../drizzle/db';
import { CategoryTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for categories
export const getCategories = async () => {
    return await db.select().from(CategoryTable);
}

export const createCategory = async (category: any) => {
    return await db.insert(CategoryTable).values(category).returning();
}

export const updateCategory = async (id: number, category: any) => {
    if (!category || Object.keys(category).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(CategoryTable).set(category).where(eq(CategoryTable.id, id)).returning();
}

export const deleteCategory = async (id: number) => {
    return await db.delete(CategoryTable).where(eq(CategoryTable.id, id)).returning();
}

export
