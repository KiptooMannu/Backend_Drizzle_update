
import db from "./drizzle/db";
import { eq, gt, like } from "drizzle-orm";
import { ProfilesTable, UsersTable, StateTable } from "./drizzle/schema";
import { TIUser, TSUser, TIProfile, TSProfile , TSState } from "./drizzle/schema";

// Query to get all users
const getUsers = async (): Promise<TSUser[] | null> => {
    return await db.select().from(UsersTable);
}

// Query to get all profiles
const getProfiles = async (): Promise<TSProfile[] | null> => {
    return await db.select().from(ProfilesTable);
}

// Insert a user profile
const createUserProfile = async (user: TIProfile) => {
    await db.insert(ProfilesTable).values({
        user_id: user.user_id,
        bio: user.bio
    }).returning()
}

// Insert a user
const createUser = async (user: TIUser) => {
    await db.insert(UsersTable).values({
        fullname: user.fullname,
        phone: user.phone,
        address: user.address,
        score: user.score,
        contact_phone: user.contact_phone,
        phone_verified: user.phone_verified,
        email: user.email,
        email_verified: user.email_verified,
        confirmation_code: user.confirmation_code,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at
    }).returning()
}

// Update a user profile
const updateUserProfile = async (bio: string, user_id: number) => {
    await db.update(ProfilesTable).set({ bio }).where(eq(ProfilesTable.user_id, user_id)).returning({ id: ProfilesTable.id })
}

// Delete a user profile
const deleteUserProfile = async (user_id: number) => {
    return db.delete(ProfilesTable).where(eq(ProfilesTable.user_id, user_id))
}

// Query users with a score greater than a value
const getUsersWithQuery = async (param: number) => {
    return await db.select().from(UsersTable).where(gt(UsersTable.score, param));
}

// Search users by name
const searchUsers = async (param: string) => {
    return await db.select().from(UsersTable).where(like(UsersTable.fullname, `%${param}%`));
}
const getStates = async (): Promise<TSState[]> => {
    return await db.select().from(StateTable);
  };

  

async function main() {
    // Example usage:
    // await createUser({ fullname: "John Doe", phone: "1234567890", address: "123 Main St", score: 100, ... });
    // await createUserProfile({ user_id: 1, bio: "I am a developer" });
    // await updateUserProfile("I am a senior developer", 1);
    // await deleteUserProfile(3);
    // console.log(await getUsers());
    // console.log(await getProfiles());
    // console.log(await getUsersWithQuery(90));
    // console.log(await searchUsers("John"));
    console.log("States:");
    const states = await getStates();
    console.log(states);
}
main();
