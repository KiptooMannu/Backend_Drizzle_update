import {db} from '../drizzle/db';
import { RestaurantOwnerTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for restaurant owners
export const getRestaurantOwners = async () => {
    return await db.select().from(RestaurantOwnerTable);
}

export const createRestaurantOwner = async (restaurantOwner: any) => {
    return await db.insert(RestaurantOwnerTable).values(restaurantOwner).returning();
}

export const deleteRestaurantOwner = async (id: number) => {
    return await db.delete(RestaurantOwnerTable).where(eq(RestaurantOwnerTable.id, id)).returning();
}
