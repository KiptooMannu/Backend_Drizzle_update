// File: src/orders/orders.service.ts

import {db} from '../drizzle/db';
import { OrdersTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for orders
export const getOrder = async () => {
    return await db.select().from(OrdersTable);
}

export const createOrder = async (order: any) => {
    return await db.insert(OrdersTable).values(order).returning();
}

export const updateOrder = async (id: number, order: any) => {
    if (!order || Object.keys(order).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(OrdersTable).set(order).where(eq(OrdersTable.id, id)).returning();
}

export const deleteOrder = async (id: number) => {
    return await db.delete(OrdersTable).where(eq(OrdersTable.id, id)).returning();
}

