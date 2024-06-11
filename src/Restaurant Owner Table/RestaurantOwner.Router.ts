import { Hono } from 'hono';
import { handleGetRestaurantOwners, handleCreateRestaurantOwner, handleDeleteRestaurantOwner } from './RestaurantOwner.controller';

export const restaurantOwnerRouter = new Hono();

// Define routes for restaurant owner resource
restaurantOwnerRouter.get('/restaurant-owners', handleGetRestaurantOwners);
restaurantOwnerRouter.post('/restaurant-owners', handleCreateRestaurantOwner);
restaurantOwnerRouter.delete('/restaurant-owners/:id', handleDeleteRestaurantOwner);
