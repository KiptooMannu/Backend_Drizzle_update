// File: src/orders/order.service.ts

import { db } from '../drizzle/db';
import { OrdersTable, AuthOnUsersTable } from '../drizzle/schema';
import { sql } from 'drizzle-orm';

// Service to handle database operations for orders and user authentication
export const getOrdersWithUsers = async () => {
    return await db.select({
        orderId: OrdersTable.id,
        orderPrice: OrdersTable.price,
        orderFinalPrice: OrdersTable.final_price,
        userId: AuthOnUsersTable.id,
        username: AuthOnUsersTable.username,
        userRole: AuthOnUsersTable.role
    })
    .from(OrdersTable)
    .leftJoin(AuthOnUsersTable, sql`${OrdersTable.user_id} = ${AuthOnUsersTable.id}`);
}

export const createOrder = async (order: any) => {
    return await db.insert(OrdersTable).values(order).returning().then(result => result[0]);
}

export const updateOrder = async (id: number, order: any) => {
    if (!order || Object.keys(order).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(OrdersTable).set(order).where(sql`${OrdersTable.id} = ${id}`).returning().then(result => result[0]);
}

export const deleteOrder = async (id: number) => {
    return await db.delete(OrdersTable).where(sql`${OrdersTable.id} = ${id}`).returning().then(result => result[0]);
}
