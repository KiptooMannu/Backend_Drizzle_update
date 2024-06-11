import { Context } from 'hono';
import { getCities, createCity, updateCity, deleteCity, searchCities } from './city.service';

// Controller to handle HTTP requests for cities
export const handleGetCities = async (c: Context) => {
    try {
        const cities = await getCities();
        return c.json(cities);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch cities', details: message }, 500);
    }
}

export const handleCreateCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const newCity = await createCity(city);
        return c.json(newCity);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create city', details: message }, 500);
    }
}

export const handleUpdateCity = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const cityInfo = await c.req.json();

        // Validate cityInfo
        if (!cityInfo || Object.keys(cityInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedCity = await updateCity(Number(id), cityInfo);
        return c.json(updatedCity);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update city', details: message }, 500);
    }
}

export const handleDeleteCity = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedCity = await deleteCity(Number(id));
        return c.json(deletedCity);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete city', details: message }, 500);
    }
}

export const handleSearchCities = async (c: Context) => {
    try {
        const { name } = c.req.query();
        const cities = await searchCities(name);
        return c.json(cities);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to search cities', details: message }, 500);
    }
}
