import db from '../drizzle/db';
import { StatusCatalogTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for status catalogs
export const getStatusCatalogs = async () => {
    return await db.select().from(StatusCatalogTable);
}

export const createStatusCatalog = async (statusCatalog: any) => {
    return await db.insert(StatusCatalogTable).values(statusCatalog).returning();
}

export const updateStatusCatalog = async (id: number, statusCatalog: any) => {
    if (!statusCatalog || Object.keys(statusCatalog).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(StatusCatalogTable).set(statusCatalog).where(eq(StatusCatalogTable.id, id)).returning();
}

export const deleteStatusCatalog = async (id: number) => {
    return await db.delete(StatusCatalogTable).where(eq(StatusCatalogTable.id, id)).returning();
}
