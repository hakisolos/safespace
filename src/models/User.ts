import mongoose from "mongoose";
import type { blogs, user } from "../types";

const userschema = new mongoose.Schema<user>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})
const User = mongoose.model("User", userschema)
export default User