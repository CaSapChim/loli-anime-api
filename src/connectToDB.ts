import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI)
        process.exit(1);
    await mongoose.connect(MONGO_URI);
    console.log("Đã kết nối tới mongoDB");
}