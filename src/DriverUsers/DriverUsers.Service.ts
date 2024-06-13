import { db } from "../drizzle/db";
import { DriverTable, UsersTable } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export const getDriverUsersService = async () => {
    const driverUsers = await db
        .select({
            driverId: DriverTable.id,
            carMake: DriverTable.car_make,
            carModel: DriverTable.car_model,
            carYear: DriverTable.car_year,
            online: DriverTable.online,
            delivering: DriverTable.delivering,
            userId: UsersTable.id,
            userFullname: UsersTable.fullname,
            userEmail: UsersTable.email,
            userPhone: UsersTable.phone
        })
        .from(DriverTable)
        .leftJoin(UsersTable, sql`${DriverTable.user_id} = ${UsersTable.id}`);

    return driverUsers;
};
