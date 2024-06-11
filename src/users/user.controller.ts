import { Context } from 'hono';
import { getUsers, createUser, updateUser, deleteUser, searchUsers } from './user.service';

// Controller to handle HTTP requests for users
export const handleGetUsers = async (c: Context) => {
    try {
        const users = await getUsers();
        return c.json(users);
    } catch (error) {
        console.error('Failed to get users:', error);
        return c.json({ error: 'Failed to get users' }, 500);
    }
}

export const handleCreateUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const newUser = await createUser(user);
        return c.json(newUser);
    } catch (error) {
        console.error('Failed to create user:', error);
        return c.json({ error: 'Failed to create user' }, 500);
    }
}

export const handleUpdateUser = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const userInfo = await c.req.json();

        // Validate userInfo
        if (!userInfo || Object.keys(userInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedUser = await updateUser(Number(id), userInfo);
        return c.json(updatedUser);
    } catch (error) {
        console.error('Failed to update user:', error);
        return c.json({ error: 'Failed to update user' }, 500);
    }
}

export const handleDeleteUser = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedUser = await deleteUser(Number(id));
        return c.json(deletedUser);
    } catch (error) {
        console.error('Failed to delete user:', error);
        return c.json({ error: 'Failed to delete user' }, 500);
    }
}

export const handleSearchUsers = async (c: Context) => {
    try {
        const { fullName } = c.req.query();
        const users = await searchUsers(fullName);
        return c.json(users);
    } catch (error) {
        console.error('Failed to search users:', error);
        return c.json({ error: 'Failed to search users' }, 500);
    }
}
