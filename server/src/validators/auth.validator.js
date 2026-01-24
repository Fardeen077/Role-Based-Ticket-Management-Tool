import { body } from "express-validator";

export const registerValidator = [
    // Register 
    body("name").trim().notEmpty()
        .withMessage("Name is required").isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters"),

    body("email").trim().isEmail()
        .withMessage("Email is required"),

    body("password").notEmpty().isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

// Login 
export const loginValidator = [
    body("email").trim().notEmpty()
        .withMessage("Email is required")
        .isEmail().withMessage("Invalid email address"),


    body("password").notEmpty()
        .withMessage("Password must be at least 6 characters"),
];