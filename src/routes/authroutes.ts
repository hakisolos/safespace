import { User } from "../models/User";
import { newUser, getUser } from "../controllers/authcontrollers";
import { Hono } from "hono";

const auth = new Hono()

auth.post("/signup", async (c) => {
    const body = await c.req.json()
    if(!body.username || !body.password || !body.email) {
        return c.json("bad request", 401)
    }
    try{
        let username = body.username || "anonymous"
        const user = await newUser(body.email, username, body.password)
        return c.json("account created successfully", 200)
    }catch(e) {
        console.log(e)
        return c.json("an error occured", 500)
    }
})

auth.get("/getuser", async(c) => {
    const email = c.req.query("email")
    if(!email) {
        return c.json("email missing")
    }
    try{
        const usr = await getUser(email)
        return c.json(usr)
    }catch(e) {
        console.log(e)
        return c.json("an error occured", 500)
    }
})

auth.post("/login", async (c) => {
    const body = await c.req.json()
    if(!body.email || !body.password) {
        return c.json("bad request", 401)
    }
    try{
        const usr = await User.findOne({email: body.email})
        if(!usr) {
            return c.json("user not found", 404)
        }
        const isMatch = body.password === usr.password
        if(isMatch) {
            return c.json("login successful", 200)
        }else {
            return c.json("wrong password", 401)
        }
    }catch(e) {
        console.log(e)
        return c.json("an error occured", 500)
    }
})

export default auth;