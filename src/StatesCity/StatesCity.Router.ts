import { Hono } from 'hono';
import { getStatesAndCitiesController } from './StatesCity.controller';

export const statesCityRouter = new Hono();

// Get all states and their respective cities
statesCityRouter.get('/states-cities', getStatesAndCitiesController);

export default statesCityRouter;
