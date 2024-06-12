import { Context } from "hono";
import { getStatesAndCitiesService } from "./StatesCity.service";

export const getStatesAndCitiesController = async (c: Context) => {
    try {
        const statesAndCities = await getStatesAndCitiesService();
        if (statesAndCities == null || statesAndCities.length == 0) {
            return c.text("No states and cities found", 404);
        }
        return c.json(statesAndCities, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
