import { Context } from 'hono';
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, searchRestaurant } from './restaurant.service';

// Controller to handle HTTP requests for restaurants
export const handleGetRestaurants = async (c: Context) => {
    try {
        const restaurants = await getRestaurants();
        console.log(restaurants)
        return c.json(restaurants);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log({ error: 'Failed to fetch restaurants', details: message }, 500);
    }
}

export const handleCreateRestaurant = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const newRestaurant = await createRestaurant(restaurant);
        return c.json(newRestaurant);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log({ error: 'Failed to create restaurant', details: message }, 500);
    }
}

export const handleUpdateRestaurant = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const restaurantInfo = await c.req.json();

        // Validate restaurantInfo
        if (!restaurantInfo || Object.keys(restaurantInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedRestaurant = await updateRestaurant(Number(id), restaurantInfo);
        return c.json(updatedRestaurant);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update restaurant', details: message }, 500);
    }
}

export const handleDeleteRestaurant = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedRestaurant = await deleteRestaurant(Number(id));
        return c.json(deletedRestaurant);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete restaurant', details: message }, 500);
    }
}

export const handleSearchRestaurants = async (c: Context) => {
    try {
        const { name } = c.req.query();
        const restaurants = await searchRestaurant(name);
        return c.json(restaurants);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to search restaurants', details: message }, 500);
    }
}
