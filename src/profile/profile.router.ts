import { Hono } from 'hono';
import { handleGetProfiles, handleCreateProfile, handleUpdateProfile, handleDeleteProfile, handleSearchProfiles } from './profile.controller';

const profileRouter = new Hono();

// Define routes for profile resource
profileRouter.get('/profiles', handleGetProfiles);
profileRouter.post('/profiles', handleCreateProfile);
profileRouter.put('/profiles/:id', handleUpdateProfile);
profileRouter.delete('/profiles/:id', handleDeleteProfile);
profileRouter.get('/profiles/search', handleSearchProfiles);

export default profileRouter;
