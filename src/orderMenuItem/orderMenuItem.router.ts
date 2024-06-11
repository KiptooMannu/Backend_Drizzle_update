import { Hono } from 'hono';
import { handleGetOrderMenuItems, handleCreateOrderMenuItem, handleUpdateOrderMenuItem, handleDeleteOrderMenuItem } from './orderMenuItem.controller';

export const orderMenuItemRouter = new Hono();

// Define routes for order menu item resource
orderMenuItemRouter.get('/order-menu-items', handleGetOrderMenuItems);
orderMenuItemRouter.post('/order-menu-items', handleCreateOrderMenuItem);
orderMenuItemRouter.put('/order-menu-items/:id', handleUpdateOrderMenuItem);
orderMenuItemRouter.delete('/order-menu-items/:id', handleDeleteOrderMenuItem);
