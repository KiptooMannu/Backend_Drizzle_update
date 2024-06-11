import { Context } from 'hono';
import * as AuthService from './auth.service';

// Register user controller
export const registerUser = async (c: Context) => {
  try {
    const { fullname, phone, address, score, contact_phone, email, password } = await c.req.json();
    // Ensure all required fields are present
    if (!fullname || !phone || !address || !contact_phone || !email || !password) {
      return c.text('All fields are required', 400);
    }
    await AuthService.registerUser({ fullname, phone, address, score, contact_phone, email, password });
    return c.text('User registered successfully', 201);
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    return c.text(error.message, 400);
  }
};

// Login user controller
export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    // Ensure email and password are present
    if (!email || !password) {
      return c.text('Email and password are required', 400);
    }
    const { token, user } = await AuthService.loginUser(email, password);
    return c.json({ token, user }, 200);
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    return c.text(error.message, 400);
  }
};

// Verify token controller
export const verifyToken = (c: Context) => {
  try {
    const token = c.req.header('authorization')?.split(' ')[1]; // Assuming the token is sent in the Authorization header
    if (!token) {
      return c.text('Token is required', 400);
    }
    const decoded = AuthService.verifyToken(token);
    return c.json({ decoded }, 200);
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    return c.text(error.message, 400);
  }
};
