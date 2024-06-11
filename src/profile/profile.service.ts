import db from '../drizzle/db';
import { ProfilesTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for profiles
export const getProfiles = async () => {
    return await db.select().from(ProfilesTable);
}

export const createProfile = async (profile: any) => {
    return await db.insert(ProfilesTable).values(profile).returning();
}

export const updateProfile = async (id: number, profile: any) => {
    if (!profile || Object.keys(profile).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(ProfilesTable).set(profile).where(eq(ProfilesTable.id, id)).returning();
}

export const deleteProfile = async (id: number) => {
    return await db.delete(ProfilesTable).where(eq(ProfilesTable.id, id)).returning();
}

export const searchProfiles = async (bio: string) => {
    return await db.select().from(ProfilesTable).where(eq(ProfilesTable.bio, bio));
}
