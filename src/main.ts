import { Hono } from "hono";
import "dotenv/config"
import{serve} from '@hono/node-server';

//USER ROUTER

import {userRouter} from './users/user.router'
import {cityRouter} from './city/city.router'
import {orderRouter} from './orders/order.router'
import{restaurantRouter} from './restaurant/restaurant.router'
import stateRouter from './state/state.router'


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



serve({
    fetch: app.fetch,
    port: Number(process.env.port)
})

console.log(`Server is running at port ${process.env.PORT}`);