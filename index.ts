import { Hono } from "hono";
const port = process.env.PORT
const app = new Hono()

app.get("/", (c) => {
    return c.json("hello world")
})

Bun.serve({
    fetch: app.fetch,
    port: Number(port)
})
console.log(`server running on port ${port}`)