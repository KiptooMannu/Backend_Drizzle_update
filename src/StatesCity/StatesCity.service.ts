import { db } from "../drizzle/db";
import { StateTable, CityTable } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export const getStatesAndCitiesService = async () => {
    const statesAndCities = await db
        .select({
            stateId: StateTable.id,
            stateName: StateTable.name,
            stateCode: StateTable.code,
            cityId: CityTable.id,
            cityName: CityTable.name,
            cityStateId: CityTable.state_id
        })
        .from(StateTable)
        .leftJoin(CityTable, sql`${StateTable.id} = ${CityTable.state_id}`);
        
    return statesAndCities;
};
