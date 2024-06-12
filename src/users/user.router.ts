
import { Hono } from 'hono';
import { getUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController } from './user.controller';
import { zValidator } from '@hono/zod-validator';
// Import the userSchema from the validators module
import { userSchema } from '../validator';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middlewares/auth.middleware';

export const userRouter = new Hono();

// get all users
userRouter
    .get("users", userRoleAuth, getUsersController)
    .post("users", zValidator('json', userSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createUserController)

// get user by id
userRouter
    .get("users/:id", bothRoleAuth, getUserByIdController)
    .put("users/:id", zValidator('json', userSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateUserController)
    .delete("users/:id", deleteUserController);