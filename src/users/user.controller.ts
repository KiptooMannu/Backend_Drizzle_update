import { Context } from 'hono';
import { getUsers, createUser, updateUser, deleteUser, searchUsers } from './user.service';

// Controller to handle HTTP requests for users
export const handleGetUsers = async (c: Context) => {
    const users = await getUsers();
    return c.json(users);
}

export const handleCreateUser = async (c: Context) => {
    const user = await c.req.json();
    const newUser = await createUser(user);
    return c.json(newUser);
}

export const handleUpdateUser = async (c: Context) => {
    const { id } = c.req.param();
    const userInfo = await c.req.json();

    // Validate userInfo
    if (!userInfo || Object.keys(userInfo).length === 0) {
        return c.json({ error: 'No values to update' }, 400);
    }

    const updatedUser = await updateUser(Number(id), userInfo);
    return c.json(updatedUser);
}

export const handleDeleteUser = async (c: Context) => {
    const { id } = c.req.param();
    const deletedUser = await deleteUser(Number(id));
    return c.json(deletedUser);
}

export const handleSearchUsers = async (c: Context) => {
    const { fullName } = c.req.query();
    const users = await searchUsers(fullName);
    return c.json(users);
}
