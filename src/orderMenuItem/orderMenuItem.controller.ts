import { Context } from 'hono';
import { getOrderMenuItems, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from './orderMenuItem.service';

// Controller to handle HTTP requests for order menu items
export const handleGetOrderMenuItems = async (c: Context) => {
    try {
        const orderMenuItems = await getOrderMenuItems();
        return c.json(orderMenuItems);
    } catch (error) {
        console.error('Failed to get order menu items:', error);
        return c.json({ error: 'Failed to get order menu items' }, 500);
    }
}

export const handleCreateOrderMenuItem = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const newOrderMenuItem = await createOrderMenuItem(orderMenuItem);
        return c.json(newOrderMenuItem);
    } catch (error) {
        console.error('Failed to create order menu item:', error);
        return c.json({ error: 'Failed to create order menu item' }, 500);
    }
}

export const handleUpdateOrderMenuItem = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const orderMenuItemInfo = await c.req.json();

        // Validate orderMenuItemInfo
        if (!orderMenuItemInfo || Object.keys(orderMenuItemInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedOrderMenuItem = await updateOrderMenuItem(Number(id), orderMenuItemInfo);
        return c.json(updatedOrderMenuItem);
    } catch (error) {
        console.error('Failed to update order menu item:', error);
        return c.json({ error: 'Failed to update order menu item' }, 500);
    }
}

export const handleDeleteOrderMenuItem = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedOrderMenuItem = await deleteOrderMenuItem(Number(id));
        return c.json(deletedOrderMenuItem);
    } catch (error) {
        console.error('Failed to delete order menu item:', error);
        return c.json({ error: 'Failed to delete order menu item' }, 500);
    }
}
