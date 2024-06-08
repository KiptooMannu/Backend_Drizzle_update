// File: src/orders/orders.controller.ts

import { Context } from 'hono';
import { getOrder, createOrder, updateOrder, deleteOrder } from './order.service';

// Controller to handle HTTP requests for orders
export const handleGetOrders = async (c: Context) => {
    try {
        const orders = await getOrder();
        return c.json(orders);
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
}

export const handleCreateOrder = async (c: Context) => {
    try {
        const order = await c.req.json();
        const newOrder = await createOrder(order);
        return c.json(newOrder);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

export const handleUpdateOrder = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const orderInfo = await c.req.json();

        // Validate orderInfo
        if (!orderInfo || Object.keys(orderInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedOrder = await updateOrder(Number(id), orderInfo);
        return c.json(updatedOrder);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

export const handleDeleteOrder = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedOrder = await deleteOrder(Number(id));
        return c.json(deletedOrder);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
