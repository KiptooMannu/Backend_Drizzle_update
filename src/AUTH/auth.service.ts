import { TIAuthOnUsers, TSAuthOnUsers, AuthOnUsersTable } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { sql } from "drizzle-orm";
import { sendWelcomeEmail } from "../Mailerr.js/Mailer";

export const createAuthUserService = async (user: TIAuthOnUsers): Promise<string | null> => {
    // Check if a user with the same email already exists
    const existingUser = await db.query.AuthOnUsersTable.findFirst({
        where: sql`${AuthOnUsersTable.email} = ${user.email}`,
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Insert the new user
    await db.insert(AuthOnUsersTable).values(user);

    // Send welcome email
    await sendWelcomeEmail(user.email, "Welcome to Our Service , Thank you for signing up!");

    return "User created successfully";
};

export const userLoginService = async (user: TSAuthOnUsers) => {
    const { username } = user;
    return await db.query.AuthOnUsersTable.findFirst({
        columns: {
            id: true,
            username: true,
            email: true,
            role: true,
            password: true,
        },
        where: sql`${AuthOnUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    fullname: true,
                    email: true,
                    contact_phone: true,
                },
            },
        },
    });
};
