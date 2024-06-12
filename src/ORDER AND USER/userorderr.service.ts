import { db } from "../drizzle/db";
import { OrdersTable, UsersTable } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export const getUsersAndOrdersService = async () => {
    const usersAndOrders = await db
        .select({
            orderId: OrdersTable.id,
            orderPrice: OrdersTable.price,
            orderDiscount: OrdersTable.discount,
            orderFinalPrice: OrdersTable.final_price,
            userId: UsersTable.id,
            userName: UsersTable.fullname,
            userEmail: UsersTable.email
        })
        .from(OrdersTable)
        .leftJoin(UsersTable, sql`${OrdersTable.user_id} = ${UsersTable.id}`);
        
    return usersAndOrders;
};
