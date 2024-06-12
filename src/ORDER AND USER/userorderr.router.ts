import { Hono } from 'hono';
import { getUsersAndOrdersController } from './userorderr.controller';

export const orderUserRouter = new Hono();

// Get all users and their respective orders
orderUserRouter.get('/users-orders', getUsersAndOrdersController);

export default orderUserRouter;
