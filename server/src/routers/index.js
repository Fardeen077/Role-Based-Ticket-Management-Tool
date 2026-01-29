import authRouter from "../routers/auth.router.js";
import ticketRouter from "../routers/ticket.router.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/tickets", ticketRouter);

export default router;