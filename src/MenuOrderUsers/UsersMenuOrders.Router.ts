import { Hono } from 'hono';
import { getUsersOrdersMenuItemsController } from './UsersMenuOrders.Controller';

export const orderUsersMenuRouter = new Hono();

// Get all users, their respective orders, and menu items
orderUsersMenuRouter.get('/users-orders-menu-items', getUsersOrdersMenuItemsController);

export default orderUsersMenuRouter;
