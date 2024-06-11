import { Hono } from 'hono';
import { handleGetCities, handleCreateCity, handleUpdateCity, handleDeleteCity, handleSearchCities } from './city.controller';

const cityRouter = new Hono();

// Define routes for city resource
cityRouter.get('/cities', handleGetCities);
cityRouter.post('/cities', handleCreateCity);
cityRouter.put('/cities/:id', handleUpdateCity);
cityRouter.delete('/cities/:id', handleDeleteCity);
cityRouter.get('/cities/search', handleSearchCities);

export default cityRouter;
