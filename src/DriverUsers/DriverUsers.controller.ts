import { Context } from "hono";
import { getDriverUsersService } from "./DriverUsers.Service";

export const getDriverUsersController = async (c: Context) => {
    try {
        const data = await getDriverUsersService();
        if (data.length === 0) {
            return c.json({ message: "No drivers found" }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
