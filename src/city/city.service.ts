import db from '../drizzle/db';
import { CityTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for cities
export const getCities = async () => {
    return await db.select().from(CityTable);
}

export const createCity = async (city: any) => {
    return await db.insert(CityTable).values(city).returning();
}

export const updateCity = async (id: number, city: any) => {
    if (!city || Object.keys(city).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(CityTable).set(city).where(eq(CityTable.id, id)).returning();
}

export const deleteCity = async (id: number) => {
    return await db.delete(CityTable).where(eq(CityTable.id, id)).returning();
}

export const searchCities = async (name: string) => {
    return await db.select().from(CityTable).where(eq(CityTable.name, name));
}
