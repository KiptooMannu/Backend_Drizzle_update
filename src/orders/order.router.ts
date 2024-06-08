// File: src/orders/orders.router.ts

import { Hono } from 'hono';
import { handleGetOrders, handleCreateOrder, handleUpdateOrder, handleDeleteOrder } from './order.controller';

export const orderRouter = new Hono();

// Define routes for orders resource
orderRouter.get('/orders', handleGetOrders);
orderRouter.post('/orders', handleCreateOrder);
orderRouter.put('/orders/:id', handleUpdateOrder);
orderRouter.delete('/orders/:id', handleDeleteOrder);


export default orderRouter;
