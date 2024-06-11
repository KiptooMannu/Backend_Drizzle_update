import { Hono } from 'hono';
import { handleGetStatusCatalogs, handleCreateStatusCatalog, handleUpdateStatusCatalog, handleDeleteStatusCatalog } from './statuscatalogue.controller';

export const statusCatalogRouter = new Hono();

// Define routes for status catalog resource
statusCatalogRouter.get('/status-catalogs', handleGetStatusCatalogs);
statusCatalogRouter.post('/status-catalogs', handleCreateStatusCatalog);
statusCatalogRouter.put('/status-catalogs/:id', handleUpdateStatusCatalog);
statusCatalogRouter.delete('/status-catalogs/:id', handleDeleteStatusCatalog);
