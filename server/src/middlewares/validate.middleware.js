import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

export const validate = asyncHandler(async (req, res, next) => {
    // Step 1: Get validation errors from the request using validationResult
    // Step 2: If errors exist, throw a 422 ApiError with all messages combined
    // Step 3: If no errors, pass control to the next middleware

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422,
            errors.array().map(err => err.msg).join(",")
        )
    }
    next();
});

