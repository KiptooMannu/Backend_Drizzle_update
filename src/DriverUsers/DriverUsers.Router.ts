import { Hono } from "hono";
import { getDriverUsersController } from "./DriverUsers.controller";

export const driverUserRouter = new Hono();

driverUserRouter.get("/driverusers", getDriverUsersController);

export default driverUserRouter;
