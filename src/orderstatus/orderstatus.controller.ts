import { Context } from 'hono';
import { getOrderStatuses, createOrderStatus, updateOrderStatus, deleteOrderStatus } from './orderstatus.service';

// Controller to handle HTTP requests for order statuses
export const handleGetOrderStatuses = async (c: Context) => {
    try {
        const orderStatuses = await getOrderStatuses();
        return c.json(orderStatuses);
    } catch (error) {
        console.error('Failed to get order statuses:', error);
        return c.json({ error: 'Failed to get order statuses' }, 500);
    }
}

export const handleCreateOrderStatus = async (c: Context) => {
    try {
        const orderStatus = await c.req.json();
        const newOrderStatus = await createOrderStatus(orderStatus);
        return c.json(newOrderStatus);
    } catch (error) {
        console.error('Failed to create order status:', error);
        return c.json({ error: 'Failed to create order status' }, 500);
    }
}

export const handleUpdateOrderStatus = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const orderStatusInfo = await c.req.json();

        // Validate orderStatusInfo
        if (!orderStatusInfo || Object.keys(orderStatusInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedOrderStatus = await updateOrderStatus(Number(id), orderStatusInfo);
        return c.json(updatedOrderStatus);
    } catch (error) {
        console.error('Failed to update order status:', error);
        return c.json({ error: 'Failed to update order status' }, 500);
    }
}

export const handleDeleteOrderStatus = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedOrderStatus = await deleteOrderStatus(Number(id));
        return c.json(deletedOrderStatus);
    } catch (error) {
        console.error('Failed to delete order status:', error);
        return c.json({ error: 'Failed to delete order status' }, 500);
    }
}
