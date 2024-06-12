
import { TIAuthOnUsers, TSAuthOnUsers, AuthOnUsersTable } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUsers): Promise<string | null> => {
    await db.insert(AuthOnUsersTable).values(user);
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUsers) => {
  const { username } = user;
  return await db.query.AuthOnUsersTable.findFirst({
    columns: {
      id: true,
      username:true,
      role:true,
      password:true
    },
    where: sql`${AuthOnUsersTable.username} = ${username}`,
    with: {
      user: {
        columns: {
          fullname: true,
          email: true,
          contact_phone:true
        }
      }
    }
  });
};
