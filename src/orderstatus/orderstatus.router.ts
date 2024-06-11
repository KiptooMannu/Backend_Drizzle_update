import { Hono } from 'hono';
import { handleGetOrderStatuses, handleCreateOrderStatus, handleUpdateOrderStatus, handleDeleteOrderStatus } from './orderstatus.controller';

export const orderStatusRouter = new Hono();

// Define routes for order status resource
orderStatusRouter.get('/order-statuses', handleGetOrderStatuses);
orderStatusRouter.post('/order-statuses', handleCreateOrderStatus);
orderStatusRouter.put('/order-statuses/:id', handleUpdateOrderStatus);
orderStatusRouter.delete('/order-statuses/:id', handleDeleteOrderStatus);
