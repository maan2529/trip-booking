import mongoose from "mongoose";
import config from "./environment.js";
const { MONGO_URI } = config;


export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
       console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}