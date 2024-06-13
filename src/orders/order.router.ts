// File: src/orders/order.router.ts

import { Hono } from 'hono';
import { handleGetOrdersWithUsers, handleCreateOrder, handleUpdateOrder, handleDeleteOrder } from './order.controller';
import { adminRoleAuth, bothRoleAuth } from './../middlewares/auth.middleware';

export const orderRouter = new Hono();

// Define routes for orders resource
orderRouter.get('/orders', bothRoleAuth, handleGetOrdersWithUsers); // Both admin and user can view orders
orderRouter.post('/orders', adminRoleAuth, handleCreateOrder); // Only admin can create orders
orderRouter.put('/orders/:id', adminRoleAuth, handleUpdateOrder); // Only admin can update orders
orderRouter.delete('/orders/:id', adminRoleAuth, handleDeleteOrder); // Only admin can delete orders

export default orderRouter;
