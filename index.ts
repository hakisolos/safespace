import { Hono } from "hono";
import mongoose from "mongoose";
const port = process.env.PORT
const app = new Hono()

app.get("/", (c) => {
    return c.json("hello world")
})

mongoose.connect("mongodb+srv://hakixer:thi54dAl5brg3r41@shell-haki.snamlx9.mongodb.net/?retryWrites=true&w=majority&appName=shell-haki")
    .then(() => { console.log("mongoose connected") })
Bun.serve({
    fetch: app.fetch,
    port: Number(port)
})
console.log(`server running on port ${port}`)
