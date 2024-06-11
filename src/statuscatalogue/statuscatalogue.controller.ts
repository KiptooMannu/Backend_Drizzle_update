import { Context } from 'hono';
import { getStatusCatalogs, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog } from './statuscatalogue.service';

// Controller to handle HTTP requests for status catalogs
export const handleGetStatusCatalogs = async (c: Context) => {
    try {
        const statusCatalogs = await getStatusCatalogs();
        return c.json(statusCatalogs);
    } catch (error) {
        console.error('Failed to get status catalogs:', error);
        return c.json({ error: 'Failed to get status catalogs' }, 500);
    }
}

export const handleCreateStatusCatalog = async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const newStatusCatalog = await createStatusCatalog(statusCatalog);
        return c.json(newStatusCatalog);
    } catch (error) {
        console.error('Failed to create status catalog:', error);
        return c.json({ error: 'Failed to create status catalog' }, 500);
    }
}

export const handleUpdateStatusCatalog = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const statusCatalogInfo = await c.req.json();

        // Validate statusCatalogInfo
        if (!statusCatalogInfo || Object.keys(statusCatalogInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedStatusCatalog = await updateStatusCatalog(Number(id), statusCatalogInfo);
        return c.json(updatedStatusCatalog);
    } catch (error) {
        console.error('Failed to update status catalog:', error);
        return c.json({ error: 'Failed to update status catalog' }, 500);
    }
}

export const handleDeleteStatusCatalog = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedStatusCatalog = await deleteStatusCatalog(Number(id));
        return c.json(deletedStatusCatalog);
    } catch (error) {
        console.error('Failed to delete status catalog:', error);
        return c.json({ error: 'Failed to delete status catalog' }, 500);
    }
}
