import { db } from "../drizzle/db";
import { OrdersTable, UsersTable, MenuItemTable, OrderMenuItemTable } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export const getUsersOrdersMenuItemsService = async () => {
    const usersOrdersMenuItems = await db
        .select({
            userId: UsersTable.id,
            userName: UsersTable.fullname,
            userEmail: UsersTable.email,
            orderId: OrdersTable.id,
            orderPrice: OrdersTable.price,
            orderDiscount: OrdersTable.discount,
            orderFinalPrice: OrdersTable.final_price,
            menuItemId: MenuItemTable.id,
            menuItemName: MenuItemTable.name,
            menuItemPrice: MenuItemTable.price,
            orderQuantity: OrderMenuItemTable.quantity
        })
        .from(OrdersTable)
        .leftJoin(UsersTable, sql`${OrdersTable.user_id} = ${UsersTable.id}`)
        .leftJoin(OrderMenuItemTable, sql`${OrdersTable.id} = ${OrderMenuItemTable.order_id}`)
        .leftJoin(MenuItemTable, sql`${OrderMenuItemTable.menu_item_id} = ${MenuItemTable.id}`);

    return usersOrdersMenuItems;
};
