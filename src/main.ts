import { Hono } from "hono";
import "dotenv/config"
import{serve} from '@hono/node-server';

//USER ROUTER

import {userRouter} from './users/user.router'
import cityRouter from './city/city.router'
import {orderRouter} from './orders/order.router'
import{restaurantRouter} from './restaurant/restaurant.router'
import stateRouter from './state/state.router'
import categoryRouter from './category/category.router';
import addressRouter from './adddress/address.router';
import profileRouter from './profile/profile.router';
import driverRouter from './Driver/driver.router';
import commentRouter from './comment/comment.router'
import { statusCatalogRouter } from './statuscatalogue/statuscatalogue.router';
import { orderStatusRouter } from './orderstatus/orderstatus.router'; // Import the orderStatusRouter
import { menuItemRouter } from './menuitem/menuitem.router'; // Import the menuItemRouter
import { orderMenuItemRouter } from './orderMenuItem/orderMenuItem.router'; // Import the orderMenuItemRouter
import { restaurantOwnerRouter } from './Restaurant Owner Table/RestaurantOwner.Router'; // Import the restaurantOwnerRouter
import { statesCityRouter } from './StatesCity/StatesCity.Router';
import { orderUserRouter } from './ORDER AND USER/userorderr.router'; // Import the orderUserRouter
import  orderUsersMenuRouter  from './menuOrderUsers/UsersMenuOrders.Router';
import  authRouter  from './AUTH/auth.router';
import driverUserRouter from "./DriverUsers/DriverUsers.Router";




const app = new Hono().basePath("/api")
//default route
app.get('ok', (c) => {
    return c.text("Server running")
})

app.route ("/" , userRouter)
app.route ("/" , cityRouter)
app.route ("/" , orderRouter)
app.route ("/" ,  restaurantRouter)
app.route ("/" , stateRouter)
app.route ("/"  , categoryRouter)
app.route("/", addressRouter);
app.route('/', profileRouter);
app.route('/', driverRouter);
app.route('/' ,commentRouter)
app.route("/", statusCatalogRouter);
app.route("/", orderStatusRouter);
app.route("/", menuItemRouter);
app.route("/", orderMenuItemRouter);
app.route("/", restaurantOwnerRouter);
app.route('/', authRouter) // /api/v1/auth/register
app.route('/', statesCityRouter);
app.route('/', orderUserRouter);
app.route('/', orderUsersMenuRouter);
app.route("/", driverUserRouter);


console.log('Routes registered:', app.routes); 




serve({
    fetch: app.fetch,
    port: 8000
})

console.log(`Server is running at port 8000`);

