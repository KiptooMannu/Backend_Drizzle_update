// File: src/user.router.ts

import { Hono } from 'hono';
import { handleGetUsers, handleCreateUser, handleUpdateUser , handleDeleteUser,handleSearchUsers  } from './user.controller';

export const userRouter = new Hono();

// Define routes for user resource
userRouter.get('/users', handleGetUsers);
userRouter.post('/users', handleCreateUser);
userRouter.put('/users/:id', handleUpdateUser);
userRouter.delete('/users/:id', handleDeleteUser);
userRouter.get('/users/search', handleSearchUsers);




export default userRouter;
