
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";

import { TIUser, TSUser, UsersTable } from "../drizzle/schema";

// GET ALL USERS
export const getUsersService = async (): Promise<TSUser[] | null> => {
    const users = await db.query.UsersTable.findMany();
    return users;
};
// GET USER BY ID
export const getUserByIdService = async (id: number): Promise<TSUser | undefined> => {
    const user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.id, id)
    });
    return user;
}



// CREATE USER
export const createUserService = async (user: TIUser) => {
    await db.insert(UsersTable).values(user)
    return "user created successfully";
}

//  UPDATE USER
export const updateUserService = async (id: number, user: TIUser) => {
    await db.update(UsersTable).set(user).where(eq(UsersTable.id, id));
    return "user updated successfully";
}

// DELETE USER
export const deleteUserService = async (id: number) => {
    await db.delete(UsersTable).where(eq(UsersTable.id, id));
    return "user deleted successfully";
}