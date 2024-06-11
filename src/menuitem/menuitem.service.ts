import db from '../drizzle/db';
import { MenuItemTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for menu items
export const getMenuItems = async () => {
    return await db.select().from(MenuItemTable);
}

export const createMenuItem = async (menuItem: any) => {
    return await db.insert(MenuItemTable).values(menuItem).returning();
}

export const updateMenuItem = async (id: number, menuItem: any) => {
    if (!menuItem || Object.keys(menuItem).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(MenuItemTable).set(menuItem).where(eq(MenuItemTable.id, id)).returning();
}

export const deleteMenuItem = async (id: number) => {
    return await db.delete(MenuItemTable).where(eq(MenuItemTable.id, id)).returning();
}
