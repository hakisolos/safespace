import type { blogs } from "../types";
import mongoose from "mongoose";

const blogschema = new mongoose.Schema<blogs>({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: true
    },
    content: {
        type: String,
        required: true,
    }
})
export const Blog = mongoose.model("Blog", blogschema)