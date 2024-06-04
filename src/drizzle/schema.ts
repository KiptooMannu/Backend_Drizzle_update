// import { pgTable, serial, text, varchar, integer, boolean, date, decimal } from "drizzle-orm/pg-core";
// import { sql } from 'drizzle-orm';

// // User Table
// export const UsersTable = pgTable("users", {
//   id: serial("id").primaryKey(),
//   fullname: text("full_name"),
//   phone: varchar("phone", { length: 100 }),
//   address: varchar("address", { length: 100 }),
//   score: integer("score"),
//   contact_phone: varchar("contact_phone", { length: 15 }).notNull(),
//   phone_verified: boolean("phone_verified").default(false),
//   email: varchar("email", { length: 100 }).notNull(),
//   email_verified: boolean("email_verified").default(false),
//   confirmation_code: varchar("confirmation_code", { length: 6 }),
//   password: varchar("password", { length: 255 }).notNull(),
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Profiles Table
// export const ProfilesTable = pgTable("profiles", {
//   id: serial("id").primaryKey(),
//   bio: varchar("bio", { length: 256 }),
//   user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }) // FK reference to users table
// });

// // Address Table
// export const AddressTable = pgTable("address", {
//   id: serial("id").primaryKey(),
//   street_address_1: varchar("street_address_1", { length: 255 }),
//   street_address_2: varchar("street_address_2", { length: 255 }),
//   zip_code: varchar("zip_code", { length: 10 }),
//   delivery_instructions: varchar("delivery_instructions", { length: 255 }),
//   user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
//   city_id: integer("city_id").notNull().references(() => CityTable.id, { onDelete: "cascade" }), // FK reference to city table
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Category Table
// export const CategoryTable = pgTable("category", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull()
// });

// // City Table
// export const CityTable = pgTable("city", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   state_id: integer("state_id").notNull().references(() => StateTable.id, { onDelete: "cascade" }) // FK reference to state table
// });

// // Comment Table
// export const CommentTable = pgTable("comment", {
//   id: serial("id").primaryKey(),
//   order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }), // FK reference to orders table
//   user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
//   comment_text: varchar("comment_text", { length: 255 }).notNull(),
//   is_complaint: boolean("is_complaint").default(false),
//   is_praise: boolean("is_praise").default(false),
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Driver Table
// export const DriverTable = pgTable("driver", {
//   id: serial("id").primaryKey(),
//   car_make: varchar("car_make", { length: 50 }).notNull(),
//   car_model: varchar("car_model", { length: 50 }).notNull(),
//   car_year: integer("car_year").notNull(),
//   user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
//   online: boolean("online").default(false),
//   delivering: boolean("delivering").default(false),
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Menu Item Table
// export const MenuItemTable = pgTable("menu_item", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }), // FK reference to restaurant table
//   category_id: integer("category_id").notNull().references(() => CategoryTable.id, { onDelete: "cascade" }), // FK reference to category table
//   description: varchar("description", { length: 255 }),
//   ingredients: varchar("ingredients", { length: 255 }),
//   price: decimal("price", { precision: 10, scale: 2 }).notNull(),
//   active: boolean("active").default(true),
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Order Menu Item Table
// export const OrderMenuItemTable = pgTable("order_menu_item", {
//   id: serial("id").primaryKey(),
//   order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }), // FK reference to orders table
//   menu_item_id: integer("menu_item_id").notNull().references(() => MenuItemTable.id, { onDelete: "cascade" }), // FK reference to menu item table
//   quantity: integer("quantity").notNull(),
//   item_price: decimal("item_price", { precision: 10, scale: 2 }).notNull(),
//   price: decimal("price", { precision: 10, scale: 2 }).notNull(),
//   comment: varchar("comment", { length: 255 })
// });

// // Order Status Table
// export const OrderStatusTable = pgTable("order_status", {
//   id: serial("id").primaryKey(),
//   order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }), // FK reference to orders table
//   status_catalog_id: integer("status_catalog_id").notNull().references(() => StatusCatalogTable.id, { onDelete: "cascade" }), // FK reference to status catalog table
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Orders Table
// export const OrdersTable = pgTable("orders", {
//   id: serial("id").primaryKey(),
//   restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }), // FK reference to restaurant table
//   estimated_delivery_time: date("estimated_delivery_time").notNull(),
//   actual_delivery_time: date("actual_delivery_time"),
//   delivery_address_id: integer("delivery_address_id").notNull().references(() => AddressTable.id, { onDelete: "cascade" }), // FK reference to address table
//   user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
//   driver_id: integer("driver_id").references(() => DriverTable.id, { onDelete: "cascade" }), // FK reference to driver table
//   price: decimal("price", { precision: 10, scale: 2 }).notNull(),
//   discount: decimal("discount", { precision: 10, scale: 2 }).default(sql`0`), // use sql tag for default value
//   final_price: decimal("final_price", { precision: 10, scale: 2 }).notNull(),
//   comment: varchar("comment", { length: 255 }),
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // Restaurant Table
// export const RestaurantTable = pgTable("restaurant", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   street_address: varchar("street_address", { length: 255 }).notNull(),
//   zip_code: varchar("zip_code", { length: 10 }).notNull(),
//   city_id: integer("city_id").notNull().references(() => CityTable.id, { onDelete: "cascade" }), // FK reference to city table
//   created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
//   updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
// });

// // State Table
// export const StateTable = pgTable("state", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   code: varchar("code", { length: 10 }).notNull()
// });

// // Status Catalog Table
// export const StatusCatalogTable = pgTable("status_catalog", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull()
// });

// // Restaurant Owner Table
// export const RestaurantOwnerTable = pgTable("restaurant_owner", {
//   id: serial("id").primaryKey(),
//   restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }), // FK reference to restaurant table
//   owner_id: integer("owner_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }) // FK reference to users table
// });

// export type TIUser = typeof UsersTable.$inferInsert;
// export type TSUser = typeof UsersTable.$inferSelect;
// export type TIProfile = typeof ProfilesTable.$inferInsert;
// export type TSProfile = typeof ProfilesTable.$inferSelect;
// export type TIDriver = typeof DriverTable.$inferInsert;
import { pgTable, serial, text, varchar, integer, boolean, date, decimal } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';

// User Table
export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  fullname: text("full_name"),
  phone: varchar("phone", { length: 100 }),
  address: varchar("address", { length: 100 }),
  score: integer("score"),
  contact_phone: varchar("contact_phone", { length: 15 }).notNull(),
  phone_verified: boolean("phone_verified").default(false),
  email: varchar("email", { length: 100 }).notNull(),
  email_verified: boolean("email_verified").default(false),
  confirmation_code: varchar("confirmation_code", { length: 6 }),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// Profiles Table (1-1 relationship with Users)
export const ProfilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }) // FK reference to users table
});

// Address Table (1-n relationship with Users)
export const AddressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 255 }),
  street_address_2: varchar("street_address_2", { length: 255 }),
  zip_code: varchar("zip_code", { length: 10 }),
  delivery_instructions: varchar("delivery_instructions", { length: 255 }),
  user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
  city_id: integer("city_id").notNull().references(() => CityTable.id, { onDelete: "cascade" }), // FK reference to city table
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// Category Table (1-n relationship with MenuItem)
export const CategoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull()
});

// City Table (1-n relationship with Address)
export const CityTable = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  state_id: integer("state_id").notNull().references(() => StateTable.id, { onDelete: "cascade" }) // FK reference to state table
});

// Comment Table (n-1 relationship with Users, Orders)
export const CommentTable = pgTable("comment", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }), // FK reference to orders table
  user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
  comment_text: varchar("comment_text", { length: 255 }).notNull(),
  is_complaint: boolean("is_complaint").default(false),
  is_praise: boolean("is_praise").default(false),
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// Driver Table (1-1 relationship with Users)
export const DriverTable = pgTable("driver", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 50 }).notNull(),
  car_model: varchar("car_model", { length: 50 }).notNull(),
  car_year: integer("car_year").notNull(),
  user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
  online: boolean("online").default(false),
  delivering: boolean("delivering").default(false),
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// Menu Item Table (n-1 relationship with Restaurant, Category)
export const MenuItemTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }), // FK reference to restaurant table
  category_id: integer("category_id").notNull().references(() => CategoryTable.id, { onDelete: "cascade" }), // FK reference to category table
  description: varchar("description", { length: 255 }),
  ingredients: varchar("ingredients", { length: 255 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  active: boolean("active").default(true),
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// Order Menu Item Table (n-n relationship with Orders, MenuItem)
export const OrderMenuItemTable = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }), // FK reference to orders table
  menu_item_id: integer("menu_item_id").notNull().references(() => MenuItemTable.id, { onDelete: "cascade" }), // FK reference to menu item table
  quantity: integer("quantity").notNull(),
  item_price: decimal("item_price", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  comment: varchar("comment", { length: 255 })
});

// Order Status Table (1-n relationship with Orders)
export const OrderStatusTable = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => OrdersTable.id, { onDelete: "cascade" }), // FK reference to orders table
  status_catalog_id: integer("status_catalog_id").notNull().references(() => StatusCatalogTable.id, { onDelete: "cascade" }), // FK reference to status catalog table
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`)
});

// Orders Table (n-1 relationship with Users, Address, Restaurant, Driver)
export const OrdersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }), // FK reference to restaurant table
  estimated_delivery_time: date("estimated_delivery_time").notNull(),
  actual_delivery_time: date("actual_delivery_time"),
  delivery_address_id: integer("delivery_address_id").notNull().references(() => AddressTable.id, { onDelete: "cascade" }), // FK reference to address table
  user_id: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), // FK reference to users table
  driver_id: integer("driver_id").references(() => DriverTable.id, { onDelete: "cascade" }), // FK reference to driver table
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default(sql`0`), // use sql tag for default value
  final_price: decimal("final_price", { precision: 10, scale: 2 }).notNull(),
  comment: varchar("comment", { length: 255 }),
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// Restaurant Table (1-n relationship with City)
export const RestaurantTable = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 10 }).notNull(),
  city_id: integer("city_id").notNull().references(() => CityTable.id, { onDelete: "cascade" }), // FK reference to city table
  created_at: date("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: date("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

// State Table (1-n relationship with City)
export const StateTable = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length: 10 }).notNull()
  });
  
// Status Catalog Table (1-n relationship with OrderStatus)
export const StatusCatalogTable = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull()
});

// Restaurant Owner Table (n-n relationship with Restaurant and Users)
export const RestaurantOwnerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").notNull().references(() => RestaurantTable.id, { onDelete: "cascade" }), // FK reference to restaurant table
  owner_id: integer("owner_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }) // FK reference to users table
});

// Define the types for insertion and selection
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TIProfile = typeof ProfilesTable.$inferInsert;
export type TSProfile = typeof ProfilesTable.$inferSelect;
export type TIDriver = typeof DriverTable.$inferInsert;
export type TSDriver = typeof DriverTable.$inferSelect;
export type TIAddress = typeof AddressTable.$inferInsert;
export type TSAddress = typeof AddressTable.$inferSelect;
export type TICategory = typeof CategoryTable.$inferInsert;
export type TSCategory = typeof CategoryTable.$inferSelect;
export type TICity = typeof CityTable.$inferInsert;
export type TSCity = typeof CityTable.$inferSelect;
export type TIComment = typeof CommentTable.$inferInsert;
export type TSComment = typeof CommentTable.$inferSelect;
export type TIMenuItem = typeof MenuItemTable.$inferInsert;
export type TSMenuItem = typeof MenuItemTable.$inferSelect;
export type TIOrderMenuItem = typeof OrderMenuItemTable.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItemTable.$inferSelect;
export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;
export type TIOrder = typeof OrdersTable.$inferInsert;
export type TSOrder = typeof OrdersTable.$inferSelect;
export type TIRestaurant = typeof RestaurantTable.$inferInsert;
export type TSRestaurant = typeof RestaurantTable.$inferSelect;
export type TIState = typeof StateTable.$inferInsert;
export type TSState = typeof StateTable.$inferSelect;
export type TIStatusCatalog = typeof StatusCatalogTable.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalogTable.$inferSelect;
export type TIRestaurantOwner = typeof RestaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwnerTable.$inferSelect;

