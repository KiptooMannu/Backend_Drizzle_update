import db from '../drizzle/db';
import { AddressTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for addresses
export const getAddresses = async () => {
    return await db.select().from(AddressTable);
}

export const createAddress = async (address: any) => {
    return await db.insert(AddressTable).values(address).returning();
}

export const updateAddress = async (id: number, address: any) => {
    if (!address || Object.keys(address).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(AddressTable).set(address).where(eq(AddressTable.id, id)).returning();
}

export const deleteAddress = async (id: number) => {
    return await db.delete(AddressTable).where(eq(AddressTable.id, id)).returning();
}

export const searchAddresses = async (streetAddress: string) => {
    return await db.select().from(AddressTable).where(eq(AddressTable.street_address_1, streetAddress));
}
