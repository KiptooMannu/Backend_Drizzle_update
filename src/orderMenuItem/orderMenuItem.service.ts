import db from '../drizzle/db';
import { OrderMenuItemTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for order menu items
export const getOrderMenuItems = async () => {
    return await db.select().from(OrderMenuItemTable);
}

export const createOrderMenuItem = async (orderMenuItem: any) => {
    return await db.insert(OrderMenuItemTable).values(orderMenuItem).returning();
}

export const updateOrderMenuItem = async (id: number, orderMenuItem: any) => {
    if (!orderMenuItem || Object.keys(orderMenuItem).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(OrderMenuItemTable).set(orderMenuItem).where(eq(OrderMenuItemTable.id, id)).returning();
}

export const deleteOrderMenuItem = async (id: number) => {
    return await db.delete(OrderMenuItemTable).where(eq(OrderMenuItemTable.id, id)).returning();
}
