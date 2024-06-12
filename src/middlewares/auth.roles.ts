import { Context, Next } from 'hono';

export const isAdmin = async (c: Context, next: Next) => {
  const user = c.get('user');
  if (user.role !== 'admin') {
    return c.text('Forbidden', 403);
  }
  await next();
};

export const isUser = async (c: Context, next: Next) => {
  const user = c.get('user');
  if (user.role !== 'user') {
    return c.text('Forbidden', 403);
  }
  await next();
};

export const isAdminOrUser = async (c: Context, next: Next) => {
  const user = c.get('user');
  if (user.role !== 'admin' && user.role !== 'user') {
    return c.text('Forbidden', 403);
  }
  await next();
};
