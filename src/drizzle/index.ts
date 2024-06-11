import {db} from "./db";
import { eq, gt, like } from "drizzle-orm";
import {
  ProfilesTable,
  UsersTable,
  StateTable,
  DriverTable,
  AddressTable,
  CommentTable,
  StatusCatalogTable,
  OrderMenuItemTable,
  OrdersTable,
  OrderStatusTable,
  RestaurantOwnerTable,
  RestaurantTable,
  CategoryTable,
  MenuItemTable,
  CityTable,
} from "./schema";
import {
  TIUser,
  TSUser,
  TIProfile,
  TSProfile,
  TSState,
} from "./schema";

// Query to get all users
const getUsers = async (): Promise<TSUser[] | null> => {
  return await db.select().from(UsersTable);
};

// Query to get all profiles
const getProfiles = async (): Promise<TSProfile[] | null> => {
  return await db.select().from(ProfilesTable);
};

// Insert a user profile
const createUserProfile = async (user: TIProfile) => {
  await db
    .insert(ProfilesTable)
    .values({
      user_id: user.user_id,
      bio: user.bio,
    })
    .returning();
};

// Insert a user
const createUser = async (user: TIUser) => {
  await db
    .insert(UsersTable)
    .values({
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
      updated_at: user.updated_at,
    })
    .returning();
};

// Update a user profile
const updateUserProfile = async (bio: string, user_id: number) => {
  await db
    .update(ProfilesTable)
    .set({ bio })
    .where(eq(ProfilesTable.user_id, user_id))
    .returning({ id: ProfilesTable.id });
};

// Delete a user profile
const deleteUserProfile = async (user_id: number) => {
  return db.delete(ProfilesTable).where(eq(ProfilesTable.user_id, user_id));
};

// Query users with a score greater than a value
const getUsersWithQuery = async (param: number) => {
  return await db.select().from(UsersTable).where(gt(UsersTable.score, param));
};

// Search users by name
const searchUsers = async (param: string) => {
  return await db
    .select()
    .from(UsersTable)
    .where(like(UsersTable.fullname, `%${param}%`));
};

const getStates = async (): Promise<TSState[]> => {
  return await db.select().from(StateTable);
};

const getDrivers = async () => {
  return await db.select().from(DriverTable);
};

const getAddress = async () => {
  return await db.select().from(AddressTable);
};

// Comments CRUD operations
export const getComments = async () => {
  return await db.select().from(CommentTable);
};

const getStatusCatalog = async () => {
  return await db.select().from(StatusCatalogTable);
};

const getOrders = async () => {
  return await db.select().from(OrdersTable);
};

const getOrderMenuItems = async () => {
  return await db.select().from(OrderMenuItemTable);
};

const getOrderStatus = async () => {
  return await db.select().from(OrderStatusTable);
};

const getMenuItemTable = async () => {
  return await db.select().from(MenuItemTable);
};

const getRestaurants = async () => {
  return await db.select().from(RestaurantTable);
};

const getCategories = async () => {
  return await db.select().from(CategoryTable);
};

const getCityTable = async () => {
  return await db.select().from(CityTable);
};

// const getCountryTable = async () => {
//     return await db.select().from(CountryTable);

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

  console.log("Drivers:");
  const drivers = await getDrivers();
  console.log(drivers);

  console.log("States:");
  const states = await getStates();
  console.log(states);

  console.log("Comments:");
  const comments = await getComments();
  console.log(comments);

  console.log("Addresses:");
  const addresses = await getAddress();
  console.log(addresses);

  console.log("StatusCatalog:");
  const statusCatalog = await getStatusCatalog();
  console.log(statusCatalog);

  console.log("Orders:");
  const orders = await getOrders();
  console.log(orders);

  console.log("Order Menu Items:");
  const orderMenuItems = await getOrderMenuItems();
  console.log(orderMenuItems);

  console.log("Order Status:");
  const orderStatus = await getOrderStatus();
  console.log(orderStatus);

  console.log("Restaurants:");
  const restaurants = await getRestaurants();
  console.log(restaurants);

  console.log("Categories:");
  const categories = await getCategories();
  console.log(categories);

  console.log("Menu Items:");
  const menuItems = await getMenuItemTable();
  console.log(menuItems);

  console.log("Cities:");
  const cities = await getCityTable();
  console.log(cities);
}

main();
