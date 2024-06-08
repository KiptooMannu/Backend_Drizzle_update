import { Hono } from 'hono';
import { handleGetRestaurants, handleCreateRestaurant, handleUpdateRestaurant, handleDeleteRestaurant, handleSearchRestaurants } from './restaurant.controller';

export const restaurantRouter = new Hono();

// Define routes for restaurant resource
restaurantRouter.get('/restaurant', handleGetRestaurants);
restaurantRouter.post('/restaurant', handleCreateRestaurant);
restaurantRouter.put('/restaurant/:id', handleUpdateRestaurant);
restaurantRouter.delete('/restaurant/:id', handleDeleteRestaurant);
restaurantRouter.get('/restaurant/search', handleSearchRestaurants);

export default restaurantRouter;
