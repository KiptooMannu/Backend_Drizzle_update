

import { Context } from 'hono';
import { getOrdersWithUsers, createOrder, updateOrder, deleteOrder } from './order.service';

// Controller to handle HTTP requests for orders and users
export const handleGetOrdersWithUsers = async (c: Context) => {
    try {
        const orders = await getOrdersWithUsers();
        return c.json(orders);
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
}

export const handleCreateOrder = async (c: Context) => {
    try {
        const order = await c.req.json();
        const newOrder = await createOrder(order);
        return c.json({ message: 'Order created successfully', order: newOrder });
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
        return c.json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

export const handleDeleteOrder = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedOrder = await deleteOrder(Number(id));
        return c.json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
