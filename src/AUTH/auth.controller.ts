import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { TSAuthOnUsers } from "../drizzle/schema";

export const signup = async (c: Context) => {
    try {
        const user = await c.req.json();

        // Check if user already exists
        const existingUser = await userLoginService({ username: user.username } as TSAuthOnUsers);
        if (existingUser) {
            return c.json({ error: "User already exists" }, 400);
        }

        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;

        const createUser = await createAuthUserService(user);
        if (!createUser) return c.text("User not created", 400);

        return c.json({ message: createUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const loginUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        // Check if user exists
        const userExists = await userLoginService(user);
        if (userExists === null) return c.json({ error: "User not found" }, 404); // user not found

        const userMatch = await bcrypt.compare(user.password, userExists?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid Credentials" }, 400); // invalid password
        } else {
            // Create a payload
            const payload = {
                sub: userExists?.username,
                role: userExists?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180), // 3 hours
            };

            let secret = process.env.JWT_SECRET as string; // secret key
            const token = await sign(payload, secret); // generate token
            let user = userExists?.user;
            let role = userExists?.role;
            return c.json({ token, user: { role, ...user } }, 200); // return token and user details
        }
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
