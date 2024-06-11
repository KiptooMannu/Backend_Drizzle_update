import { Hono } from 'hono';
import { handleGetAddresses, handleCreateAddress, handleUpdateAddress, handleDeleteAddress, handleSearchAddresses } from './address.controller';

const addressRouter = new Hono();

// Define routes for address resource
addressRouter.get('/addresses', handleGetAddresses);
addressRouter.post('/addresses', handleCreateAddress);
addressRouter.put('/addresses/:id', handleUpdateAddress);
addressRouter.delete('/addresses/:id', handleDeleteAddress);
addressRouter.get('/addresses/search', handleSearchAddresses);

export default addressRouter;
