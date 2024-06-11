import { Context } from 'hono';
import { getDrivers, createDriver, updateDriver, deleteDriver } from './driver.service';

// Controller to handle HTTP requests for drivers
export const handleGetDrivers = async (c: Context) => {
    try {
        const drivers = await getDrivers();
        return c.json(drivers);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch drivers', details: message }, 500);
    }
}

export const handleCreateDriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const newDriver = await createDriver(driver);
        return c.json(newDriver);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create driver', details: message }, 500);
    }
}

export const handleUpdateDriver = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const driverInfo = await c.req.json();

        // Validate driverInfo
        if (!driverInfo || Object.keys(driverInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedDriver = await updateDriver(Number(id), driverInfo);
        return c.json(updatedDriver);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update driver', details: message }, 500);
    }
}

export const handleDeleteDriver = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedDriver = await deleteDriver(Number(id));
        return c.json(deletedDriver);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete driver', details: message }, 500);
    }
}
