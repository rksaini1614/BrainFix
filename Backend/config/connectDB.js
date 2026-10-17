import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONDODB_URL);
        console.log("Database connected successfully");
    }
    catch(error) {
        console.log("Error in connecting with database : ",error);
    }
}