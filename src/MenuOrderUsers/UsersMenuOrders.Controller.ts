import { Context } from "hono";
import { getUsersOrdersMenuItemsService } from "./UsersMenuOrders.service";

export const getUsersOrdersMenuItemsController = async (c: Context) => {
    try {
        const usersOrdersMenuItems = await getUsersOrdersMenuItemsService();
        if (usersOrdersMenuItems == null || usersOrdersMenuItems.length == 0) {
            return c.text("No users, orders, and menu items found", 404);
        }
        return c.json(usersOrdersMenuItems, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
