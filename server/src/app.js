import express from "express"
import router from "./routers/index.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "150kb" })); // data limit
app.use(express.urlencoded({ extended: true, limit: "50kb" })); // url limit 
app.use("/api/v1/user", router);

export default app;
