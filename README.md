## SocialMedia API: Service Layer with Drizzle & PostGres SQL

## WALK DOWN SET UP

1. **Create a package.json**:
   - Run `pnpm init` to create a package.json file.
2. **Install Dependencies** :
   - Run below commands to install the required dependencies.   
``` bash
   pnpm add drizzle-orm pg dotenv
   pnpm add -D drizzle-kit @types/pg 
```
3. **Install Dev Dependencies** :
   - Run below commands to install the required  dev-dependencies.
``` bash
   pnpm add -D drizzle-kit @faker-js/faker @types/node pg tsx typescript
```
4. **Create a .env file**:
   - Create a `.env` file to store environment variables like `DATABASE_URL`, etc.
5. **Create a tsconfig.json file**:
   - Run `pnpm tsc --init` to create a `tsconfig.json` file.
   - change the content of the tsconfig.json file to the following:
``` json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2022", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    /* Modules */
    "module": "NodeNext", /* Specify what module code is generated. */
    "moduleResolution": "NodeNext", /* Specify how TypeScript looks up a file from a given module specifier. */
    "rootDir": "./src", /* Allow multiple folders to be treated as one when resolving modules. */
    "outDir": "./dist", /* Specify an output folder for all emitted files. */
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
    /* Type Checking */
    "strict": true, /* Enable all strict type-checking options. */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
6. Create a .gitignore file:
   - Create a `.gitignore` file to exclude the `node_modules` and `dist` folders from version control.
   - add the following content to the `.gitignore` file:
``` bash
node_modules
dist
```
7. **Create a src folder**:
   - Create a `src` folder to store your TypeScript source files.
   - Add server.ts file to the src folder.

8. **Update the package.json file**:
   - Update the `package.json` file to include the following scripts:
``` json
  "scripts": {
    "dev": "tsx watch ./src/index.ts",
    "start": "node ./dist/index.js",
    "build": "tsc",
    "gen":"drizzle-kit generate",
    "migrate" : " tsx src/drizzle/migrate.ts",
    "studio" : "drizzle-kit studio",
    "push": " drizzle-kit generate && tsx src/drizzle/migrate.ts"

  }
```
9. **Add this code to server.ts file**:
   ``` typescript
   
      async function nameSalute(name:string) {
      console.log(`hello my name is ${name}`)
      } 

      nameSalute("kevin");
   ```

10. **Run the application**:

   - Run: `pnpm run dev` to start the application in development mode.
   - Run: `pnpm run build` To build your app(ts-js).

## PROJECT ENTITIES

1. **Author**:
   - Stores information about authors.
   - Attributes: `author_id`, `name`, `email`, `bio`, etc.

2. **Book**:
   - Contains details about books, including their titles, genres, and publication information.
   - Attributes: `book_id`, `title`, `genre`, `publication_date`, `author_id`, `publisher_id`, `language_id`, `pdf_url`, etc.
   - Relationships:
     - Many-to-One with Author (each book has one author).
     - Many-to-One with Publisher (each book has one publisher).
     - Many-to-One with Language (each book has one language).

3. **Publisher**:
   - Keeps track of publishers associated with books.
   - Attributes: `publisher_id`, `name`, `website_url`, etc.

4. **Language**:
   - Stores possible languages of books.
   - Attributes: `language_id`, `name`, `code` (e.g., "en" for English).

5. **Customer**:
   - Manages customer information.
   - Attributes: `customer_id`, `name`, `email`, `shipping_address`, etc.
   - Relationships:
     - One-to-Many with Address (each customer can have multiple addresses).

8. **Order**:
   - Represents orders placed by customers.
   - Attributes: `order_id`, `customer_id`, `book_id`, `order_date`, `total_amount`, etc.
   - Relationships:
     - Many-to-One with Customer (each order belongs to one customer).
     - Many-to-One with Book (each order corresponds to one book).
9. **users**:
   - Represents users of the system.
   - Attributes: `user_id`, `name`, `email`, `password`, `role`, etc.

## Project SetUP

## Folder Structure


## step 1: Create a `drizzle.config.js` file in the root of your project

```typescript
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",   //'sqlite','mysql2',
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dbCredentials: {
        url: process.env.Database_URL as string,
    },
    verbose: true,
    strict: true,

})
```

## step 2: Create a `drizzle` folder in the root of your project and add a `schema.ts` file

```typescript
import { pgTable, text, varchar, uuid, index, boolean, real, timestamp, primaryKey, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const UserRole = pgEnum("userRole", ["AUTHOR", "CUSTOMER", "ADMIN", "NO_ROLE"]);  //enums are supported in postgresql 

//-----------------TABLES-----------------
//AUTHOR
export const AuthorTable = pgTable("author", {
    author_id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    bio: varchar("bio", { length: 255 }).notNull(),
    password: text("password").notNull(),
    role: UserRole("userRole").default("AUTHOR").notNull()
})
// //CUSTOMER
export const CustomerTable = pgTable("customer", {
    customer_id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    shipping_address: varchar("bio", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: UserRole("userRole").default("CUSTOMER").notNull()
})
// //ADMIN
export const AdminTable = pgTable("admin", {
    admin_id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: UserRole("userRole").default("ADMIN").notNull()
})
// //PUBLISHER
export const PublisherTable = pgTable("publisher", {
    publisher_id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    website_url: varchar("string", { length: 255 }).notNull(),
})
// //LANGUAGE
export const LanguageTable = pgTable("language", {
    language_id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("language", { length: 255 }).notNull(),
    code: varchar("code", { length: 255 }).notNull(),
})
// //BOOK
export const BookTable = pgTable("book", {
    book_id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    published_date: timestamp("published_date").notNull(),
    author: uuid("author_id").notNull().references(() => AuthorTable.author_id, { onDelete: "cascade" }),
    publisher: uuid("publisher_id").notNull().references(() => PublisherTable.publisher_id, { onDelete: "cascade" }),
    language: uuid("language_id").notNull().references(() => LanguageTable.language_id, { onDelete: "cascade" }),
})
// //ORDER
export const OrderTable = pgTable("order", {
    order_id: uuid("id").primaryKey().defaultRandom(),
    order_date: timestamp("order_date").notNull(),
    total_price: real("total_price").notNull(),
    book: uuid("book_id").notNull().references(() => BookTable.book_id, { onDelete: "cascade" }),
    customer: uuid("customer_id").notNull().references(() => CustomerTable.customer_id, { onDelete: "cascade" }),
})

//-----------------RELATIONSHIPS----------------- (we don't do migrations for relationships)
export const AuthorTableRelations = relations(AuthorTable, ({ one }) => ({
    book: one(BookTable),
}));
export const CustomerTableRelations = relations(CustomerTable, ({ one }) => ({
    order: one(OrderTable),
}));
export const PublisherTableRelations = relations(PublisherTable, ({ one }) => ({
    book: one(BookTable),
}));
export const LanguageTableRelations = relations(LanguageTable, ({ one }) => ({
    book: one(BookTable),
}));
export const BookTableRelations = relations(BookTable, ({ one }) => ({
    author: one(AuthorTable, {
        fields: [BookTable.author],
        references: [AuthorTable.author_id]
    }),
    publisher: one(PublisherTable, {
        fields: [BookTable.publisher],
        references: [PublisherTable.publisher_id]
    }),
    language: one(LanguageTable, {
        fields: [BookTable.language],
        references: [LanguageTable.language_id]
    }),
    order: one(OrderTable),
}));
export const OrderTableRelations = relations(OrderTable, ({ one }) => ({
    book: one(BookTable, {
        fields: [OrderTable.book],
        references: [BookTable.book_id]
    }),
    customer: one(CustomerTable, {
        fields: [OrderTable.customer],
        references: [CustomerTable.customer_id]
    }),
}));

```
## step 4: inside drizzle folder create a db.ts file
```typescript
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema"

export const client = new Client({
    connectionString: process.env.Database_URL as string,   //get the database url from the environment
})

const main = async () => {
    await client.connect();  //connect to the database
}
main();


const db = drizzle(client, { schema, logger: true })  //create a drizzle instance

export default db;  //export the drizzle instance
```

## step 5: run `pnpm run push `to execute this script on your package.json

```json 
 "scripts": {
    "dev": "tsx watch ./src/index.ts",
    "start": "node ./dist/index.js",
    "build": "tsc",
    "gen":"drizzle-kit generate",
    "migrate" : " tsx src/drizzle/migrate.ts",
    "studio" : "drizzle-kit studio",
    "push": " drizzle-kit generate && tsx src/drizzle/migrate.ts"

  }
```
will push our schema files to our database and create tables

## step 6: to view changes use Drizzle Studio first ensure you install this packages below
```bash
pnpm add drizzle-orm
pnpm add -D drizzle-kit
pnpm add pg 
```
then run the following command `pnpm run studio` to execute this script
```json
"scripts": {
     "studio": "drizzle-kit studio"
  }
```


## step 8: .env file 
```bash
Database_URL= "postgresql://postgres:password@localhost:5432/socialmedia"
```
in

**API Endpoints**:
- `/authors`: CRUD endpoints for managing authors.
- `/books`: CRUD endpoints for managing books.
- `/publishers`: CRUD endpoints for managing publishers.
- `/languages`: CRUD endpoints for managing languages.
- `/customers`: CRUD endpoints for managing customers.
- `/addresses`: CRUD endpoints for managing addresses.
- `/orders`: CRUD endpoints for managing orders.

**Email Notification**:
- When a customer buys a book, you can trigger an email notification to their registered email address.

Remember to handle authentication and authorization (e.g., using tokens or sessions) for different user roles (Author, Customer, Admin) to secure your API. 





