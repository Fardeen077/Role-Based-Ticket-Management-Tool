import { asyncHandler } from "asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
        throw new ApiError(401, "Invalid accessToken");
    }
    req.user = user;
    next()
});