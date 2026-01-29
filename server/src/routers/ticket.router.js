import {
    createTicket,
    updateTicketStatus,
    getTicket,
    searchUsers,
    assignedTicket
} from "../controllers/ticket.controller.js"
import { roles } from "../middlewares/role.middleware.js"

import { validate } from "../middlewares/validate.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { Router } from "express"

const router = Router();

router.post("/", verifyJwt, roles("USER"), validate, createTicket);
router.get("/search-users", verifyJwt, roles("ADMIN"), searchUsers);
router.patch("/:id/update-status", verifyJwt, roles("ADMIN", "AGENT"), updateTicketStatus);
router.get("/:id/getTicket", verifyJwt, roles("ADMIN"), getTicket);
router.patch("/:ticketId/assigned", verifyJwt, roles("ADMIN"), assignedTicket); // i pass worng paramiter

export default router