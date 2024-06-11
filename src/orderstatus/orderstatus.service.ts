import db from '../drizzle/db';
import { OrderStatusTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for order statuses
export const getOrderStatuses = async () => {
    return await db.select().from(OrderStatusTable);
}

export const createOrderStatus = async (orderStatus: any) => {
    return await db.insert(OrderStatusTable).values(orderStatus).returning();
}

export const updateOrderStatus = async (id: number, orderStatus: any) => {
    if (!orderStatus || Object.keys(orderStatus).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(OrderStatusTable).set(orderStatus).where(eq(OrderStatusTable.id, id)).returning();
}

export const deleteOrderStatus = async (id: number) => {
    return await db.delete(OrderStatusTable).where(eq(OrderStatusTable.id, id)).returning();
}
