import { Context } from 'hono';
import { getStates, createState, updateState, deleteState, searchStates } from './state.service';

// Controller to handle HTTP requests for states
export const handleGetStates = async (c: Context) => {
    try {
        const states = await getStates();
        return c.json(states);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch states', details: message }, 500);
    }
}

export const handleCreateState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const newState = await createState(state);
        return c.json(newState);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create state', details: message }, 500);
    }
}

export const handleUpdateState = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const stateInfo = await c.req.json();

        // Validate stateInfo
        if (!stateInfo || Object.keys(stateInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedState = await updateState(Number(id), stateInfo);
        return c.json(updatedState);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update state', details: message }, 500);
    }
}

export const handleDeleteState = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedState = await deleteState(Number(id));
        return c.json(deletedState);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete state', details: message }, 500);
    }
}

export const handleSearchStates = async (c: Context) => {
    try {
        const { name } = c.req.query();
        const states = await searchStates(name);
        return c.json(states);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to search states', details: message }, 500);
    }
}
