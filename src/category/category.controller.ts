import { Context } from 'hono';
import { getCategories, createCategory, updateCategory, deleteCategory, searchCategories } from './category.service';

// Controller to handle HTTP requests for categories
export const handleGetCategories = async (c: Context) => {
    try {
        const categories = await getCategories();
        return c.json(categories);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch categories', details: message }, 500);
    }
}

export const handleCreateCategory = async (c: Context) => {
    try {
        const category = await c.req.json();
        const newCategory = await createCategory(category);
        return c.json(newCategory);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create category', details: message }, 500);
    }
}

export const handleUpdateCategory = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const categoryInfo = await c.req.json();

        // Validate categoryInfo
        if (!categoryInfo || Object.keys(categoryInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedCategory = await updateCategory(Number(id), categoryInfo);
        return c.json(updatedCategory);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update category', details: message }, 500);
    }
}

export const handleDeleteCategory = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedCategory = await deleteCategory(Number(id));
        return c.json(deletedCategory);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete category', details: message }, 500);
    }
}

export const handleSearchCategories = async (c: Context) => {
    try {
        const { name } = c.req.query();
        const categories = await searchCategories(name);
        return c.json(categories);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to search categories', details: message }, 500);
    }
}
