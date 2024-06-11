import { Context } from 'hono';
import { getProfiles, createProfile, updateProfile, deleteProfile, searchProfiles } from './profile.service';

// Controller to handle HTTP requests for profiles
export const handleGetProfiles = async (c: Context) => {
    try {
        const profiles = await getProfiles();
        return c.json(profiles);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch profiles', details: message }, 500);
    }
}

export const handleCreateProfile = async (c: Context) => {
    try {
        const profile = await c.req.json();
        const newProfile = await createProfile(profile);
        return c.json(newProfile);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create profile', details: message }, 500);
    }
}

export const handleUpdateProfile = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const profileInfo = await c.req.json();

        // Validate profileInfo
        if (!profileInfo || Object.keys(profileInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedProfile = await updateProfile(Number(id), profileInfo);
        return c.json(updatedProfile);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update profile', details: message }, 500);
    }
}

export const handleDeleteProfile = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedProfile = await deleteProfile(Number(id));
        return c.json(deletedProfile);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete profile', details: message }, 500);
    }
}

export const handleSearchProfiles = async (c: Context) => {
    try {
        const { bio } = c.req.query();
        const profiles = await searchProfiles(bio);
        return c.json(profiles);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to search profiles', details: message }, 500);
    }
}
