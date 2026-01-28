import { body } from "express-validator";

export const createTicketValidator = [
    body("title").trim().notEmpty()
        .withMessage("title is required"),

    body("description").trim().notEmpty()
        .withMessage("description is required"),

    body("priority").optional().isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("invalid priority"),

];

export const updateTicketValidator = [
    body("status")
        .isIn(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"])
        .withMessage("Invalid status"),

];