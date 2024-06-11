import {db} from '../drizzle/db';
import { RestaurantTable } from '../drizzle/schema';
import { eq, like } from 'drizzle-orm';

// Service to handle database operations for restaurants
export const getRestaurants = async () => {
    return await db.select().from(RestaurantTable);
}

export const createRestaurant = async (restaurant: any) => {
    return await db.insert(RestaurantTable).values(restaurant).returning();
}

export const updateRestaurant = async (id: number, restaurant: any) => {
    console.log('Restaurant Info:', restaurant);

    if (!restaurant || Object.keys(restaurant).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(RestaurantTable).set(restaurant).where(eq(RestaurantTable.id, id)).returning();
}

export const deleteRestaurant = async (id: number) => {
    return await db.delete(RestaurantTable).where(eq(RestaurantTable.id, id)).returning();
}

export const searchRestaurant = async (name: string) => {
    return await db.select().from(RestaurantTable).where(like(RestaurantTable.name, `%${name}%`));
}
