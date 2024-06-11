import { Context } from 'hono';
import { getRestaurantOwners, createRestaurantOwner, deleteRestaurantOwner } from './RestaurantOwner.service';

// Controller to handle HTTP requests for restaurant owners
export const handleGetRestaurantOwners = async (c: Context) => {
    try {
        const restaurantOwners = await getRestaurantOwners();
        return c.json(restaurantOwners);
    } catch (error) {
        console.error('Failed to get restaurant owners:', error);
        return c.json({ error: 'Failed to get restaurant owners' }, 500);
    }
}

export const handleCreateRestaurantOwner = async (c: Context) => {
    try {
        const restaurantOwner = await c.req.json();
        const newRestaurantOwner = await createRestaurantOwner(restaurantOwner);
        return c.json(newRestaurantOwner);
    } catch (error) {
        console.error('Failed to create restaurant owner:', error);
        return c.json({ error: 'Failed to create restaurant owner' }, 500);
    }
}

export const handleDeleteRestaurantOwner = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedRestaurantOwner = await deleteRestaurantOwner(Number(id));
        return c.json(deletedRestaurantOwner);
    } catch (error) {
        console.error('Failed to delete restaurant owner:', error);
        return c.json({ error: 'Failed to delete restaurant owner' }, 500);
    }
}
