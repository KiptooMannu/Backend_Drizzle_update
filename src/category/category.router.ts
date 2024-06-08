import { Hono } from 'hono';
import { handleGetCategories, handleCreateCategory, handleUpdateCategory, handleDeleteCategory, handleSearchCategories } from './category.controller';

const categoryRouter = new Hono();

// Define routes for category resource
categoryRouter.get('/categories', handleGetCategories);
categoryRouter.post('/categories', handleCreateCategory);
categoryRouter.put('/categories/:id', handleUpdateCategory);
categoryRouter.delete('/categories/:id', handleDeleteCategory);
categoryRouter.get('/categories/search', handleSearchCategories);

export default categoryRouter;
