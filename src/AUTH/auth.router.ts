
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { registerUserSchema, loginUserSchema } from '../validator' // Make sure this path is correct
import { signup, loginUser } from './auth.controller'

 export const authRouter = new Hono()

authRouter.post('signup', zValidator('json', registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), signup)

authRouter.post('login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUser)

 export default authRouter;