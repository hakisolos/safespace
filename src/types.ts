import { Document } from "mongoose";

export interface user extends Document {
    email: string;
    username: string;
    password: string
}

export interface blogs extends Document {
    title: string;
    author: string;
    tags: string[];
    content: string
}