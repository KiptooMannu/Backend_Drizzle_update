import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

if (!secret) {
    throw new Error("JWT secret is not defined in the environment variables");
}

export const authenticateToken = async (c: Context, next: Next) => {
    const authHeader = c.req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        const user = jwt.verify(token, secret);
        c.set('user', user);
        await next();
    } catch (error: any) {
        return c.json({ error: 'Forbidden' }, 403);
    }
};