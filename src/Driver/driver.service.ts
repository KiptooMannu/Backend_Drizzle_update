import {db} from '../drizzle/db';
import { DriverTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for drivers
export const getDrivers = async () => {
    return await db.select().from(DriverTable);
}

export const createDriver = async (driver: any) => {
    return await db.insert(DriverTable).values(driver).returning();
}

export const updateDriver = async (id: number, driver: any) => {
    if (!driver || Object.keys(driver).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(DriverTable).set(driver).where(eq(DriverTable.id, id)).returning();
}

export const deleteDriver = async (id: number) => {
    return await db.delete(DriverTable).where(eq(DriverTable.id, id)).returning();
}
