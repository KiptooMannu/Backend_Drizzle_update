import { Router } from 'express';
import { registerUser, loginUser, verifyToken } from './auth.controller';
import { Hono } from 'hono';

const authrouter = new Hono();

authrouter.post('/signup', registerUser);
authrouter.post('/login', loginUser);
authrouter.get('/verify-token', verifyToken);

export default authrouter;
