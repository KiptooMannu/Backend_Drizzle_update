import { Context } from 'hono';
import { getAddresses, createAddress, updateAddress, deleteAddress, searchAddresses } from './address.service';

// Controller to handle HTTP requests for addresses
export const handleGetAddresses = async (c: Context) => {
    try {
        const addresses = await getAddresses();
        return c.json(addresses);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch addresses', details: message }, 500);
    }
}

export const handleCreateAddress = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createAddress(address);
        return c.json(newAddress);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create address', details: message }, 500);
    }
}

export const handleUpdateAddress = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const addressInfo = await c.req.json();

        // Validate addressInfo
        if (!addressInfo || Object.keys(addressInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedAddress = await updateAddress(Number(id), addressInfo);
        return c.json(updatedAddress);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update address', details: message }, 500);
    }
}

export const handleDeleteAddress = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedAddress = await deleteAddress(Number(id));
        return c.json(deletedAddress);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete address', details: message }, 500);
    }
}

export const handleSearchAddresses = async (c: Context) => {
    try {
        const { streetAddress } = c.req.query();
        const addresses = await searchAddresses(streetAddress);
        return c.json(addresses);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to search addresses', details: message }, 500);
    }
}
