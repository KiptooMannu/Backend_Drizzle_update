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
//default route// default route
app.get('/', (c) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Drizzle Restaurant DB</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                }
                .container {
                    text-align: center;
                    padding: 50px;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Drizzle Restaurant DB</h1>
                <p>Your favorite place to manage restaurant data efficiently.</p>
                <a href="/api/ok" class="btn">Check Status</a>
            </div>
        </body>
        </html>
    `;
    return c.html(htmlContent);
});

app.get('/ok', (c) => {
    return c.text('Server running');
});

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

