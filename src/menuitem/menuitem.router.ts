import { Hono } from 'hono';
import { handleGetMenuItems, handleCreateMenuItem, handleUpdateMenuItem, handleDeleteMenuItem } from './menuitem.controller';

export const menuItemRouter = new Hono();

// Define routes for menu item resource
menuItemRouter.get('/menu-items', handleGetMenuItems);
menuItemRouter.post('/menu-items', handleCreateMenuItem);
menuItemRouter.put('/menu-items/:id', handleUpdateMenuItem);
menuItemRouter.delete('/menu-items/:id', handleDeleteMenuItem);
