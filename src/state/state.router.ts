import { Hono } from 'hono';
import { handleGetStates, handleCreateState, handleUpdateState, handleDeleteState, handleSearchStates } from './state.controller';

const stateRouter = new Hono();

// Define routes for state resource
stateRouter.get('/states', handleGetStates);
stateRouter.post('/states', handleCreateState);
stateRouter.put('/states/:id', handleUpdateState);
stateRouter.delete('/states/:id', handleDeleteState);
stateRouter.get('/states/search', handleSearchStates);


export default stateRouter;
