import { Context } from "hono";
import { getUsersAndOrdersService } from "./userorderr.service";

export const getUsersAndOrdersController = async (c: Context) => {
    try {
        const usersAndOrders = await getUsersAndOrdersService();
        if (usersAndOrders == null || usersAndOrders.length == 0) {
            return c.text("No users and orders found", 404);
        }
        return c.json(usersAndOrders, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
