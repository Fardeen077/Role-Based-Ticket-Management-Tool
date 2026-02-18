import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
import express from "express"
import router from "./routers/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORE_ORIGIN,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: "150kb" })); // data limit
app.use(express.urlencoded({ extended: true, limit: "50kb" })); // url limit 
app.use("/api/v1/user", router);
app.use(errorHandler)

// console.log("CORS ORIGIN:", process.env.CORE_ORIGIN);

export default app;
