import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 3000, 
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET
};