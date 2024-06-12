
import { Context } from "hono";
import { getUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from "./user.service";

// get all users
export const getUsersController = async (c: Context) => {
    try {
        const users = await getUsersService();
        if (users == null || users.length == 0) {
            return c.text("No users found", 404);
        }
        return c.json(users, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get user by id
export const getUserByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const user = await getUserByIdService(id);
        if (user == null) {
            return c.text("User not found", 404);
        }
        return c.json(user, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create user
export const createUserController = async (c: Context) => {
    try {
        const user = await c.req.json();
        const newUser = await createUserService(user);

        if (!newUser) return c.text("User not created", 400);
        return c.json({ message: newUser }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update user
export const updateUserController = async (c: Context) => {
    try {
        // get id from url
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const user = await c.req.json();
        //    get user by id
        const updatedUser = await getUserByIdService(id);
        if (!updatedUser) return c.text("User not found", 404);

        // get data to update
        const res = await updateUserService(id, user);
        if (!res) return c.text("User not updated", 400);
        return c.json({ message: res }, 200)
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete user
export const deleteUserController = async (c: Context) => {
    //  get id from url
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // get user by id
        const user = await getUserByIdService(id);
        if (!user) return c.text("User not found", 404);
        // delete user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};