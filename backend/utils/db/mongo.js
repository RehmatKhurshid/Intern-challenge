import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('mongoose connected');
    } catch (error) {
        console.log('something went wrong in mongodb')
    }

}