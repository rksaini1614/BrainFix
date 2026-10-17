import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import aiRouter from "./routes/aiRoute.js";
import { connectDb } from "./config/connectDB.js";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


app.get("/",(req,res)=> {
    res.json("Hello from BrainFix Server");
});

app.use("/api/v1",aiRouter);
app.use("/api/v1/auth",authRouter);


app.listen(PORT,(req,res) => {
    console.log(`Server is running at https://localhost:${PORT}`);
    connectDb();
});