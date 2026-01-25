import express from "express"
import router from "./routers/auth.router.js";
import cookieParser from "cookie-parser";
const app = express();


app.use(cookieParser());
app.use(express.json())
app.use("/api/v1/user", router)
export default app;
