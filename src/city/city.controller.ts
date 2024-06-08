import { Context } from 'hono';
import { getCity, createCity, updateCity, deleteCity, searchCity } from './city.service';

// Controller to handle HTTP requests for cities
export const handleGetCities = async (c: Context) => {
    const cities = await getCity();
    return c.json(cities);
}

export const handleCreateCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const newCity = await createCity(city);
        return c.json(newCity);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 400);
    }
}

export const handleUpdateCity = async (c: Context) => {
    const { id } = c.req.param();
    const cityInfo = await c.req.json();

    // Validate cityInfo
    if (!cityInfo || Object.keys(cityInfo).length === 0) {
        return c.json({ error: 'No values to update' }, 400);
    }

    try {
        const updatedCity = await updateCity(Number(id), cityInfo);
        return c.json(updatedCity);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 400);
    }
}

export const handleDeleteCity = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedCity = await deleteCity(Number(id));
        return c.json(deletedCity);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 400);
    }
}

export const handleSearchCities = async (c: Context) => {
    const { name } = c.req.query();
    const cities = await searchCity(name);
    return c.json(cities);
}
