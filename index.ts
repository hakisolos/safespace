import { Hono } from "hono";
import auth from "./src/routes/authroutes";
import mongoose from "mongoose";
const port = process.env.PORT
const app = new Hono()

app.get("/", (c) => {
    return c.json("hello world")
})
app.route("/auth", auth)

mongoose.connect(String(process.env.mongo))
    .then(() => { console.log("mongoose connected") })
Bun.serve({
    fetch: app.fetch,
    port: Number(port)
})
console.log(`server running on port ${port}`)
