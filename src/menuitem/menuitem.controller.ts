import { Context } from 'hono';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from './menuitem.service';

// Controller to handle HTTP requests for menu items
export const handleGetMenuItems = async (c: Context) => {
    try {
        const menuItems = await getMenuItems();
        return c.json(menuItems);
    } catch (error) {
        console.error('Failed to get menu items:', error);
        return c.json({ error: 'Failed to get menu items' }, 500);
    }
}

export const handleCreateMenuItem = async (c: Context) => {
    try {
        const menuItem = await c.req.json();
        const newMenuItem = await createMenuItem(menuItem);
        return c.json(newMenuItem);
    } catch (error) {
        console.error('Failed to create menu item:', error);
        return c.json({ error: 'Failed to create menu item' }, 500);
    }
}

export const handleUpdateMenuItem = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const menuItemInfo = await c.req.json();

        // Validate menuItemInfo
        if (!menuItemInfo || Object.keys(menuItemInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedMenuItem = await updateMenuItem(Number(id), menuItemInfo);
        return c.json(updatedMenuItem);
    } catch (error) {
        console.error('Failed to update menu item:', error);
        return c.json({ error: 'Failed to update menu item' }, 500);
    }
}

export const handleDeleteMenuItem = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedMenuItem = await deleteMenuItem(Number(id));
        return c.json(deletedMenuItem);
    } catch (error) {
        console.error('Failed to delete menu item:', error);
        return c.json({ error: 'Failed to delete menu item' }, 500);
    }
}
