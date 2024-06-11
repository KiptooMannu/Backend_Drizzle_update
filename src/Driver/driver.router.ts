import { Hono } from 'hono';
import { handleGetDrivers, handleCreateDriver, handleUpdateDriver, handleDeleteDriver } from './driver.controller';

const driverRouter = new Hono();

// Define routes for driver resource
driverRouter.get('/drivers', handleGetDrivers);
driverRouter.post('/drivers', handleCreateDriver);
driverRouter.put('/drivers/:id', handleUpdateDriver);
driverRouter.delete('/drivers/:id', handleDeleteDriver);

export default driverRouter;
