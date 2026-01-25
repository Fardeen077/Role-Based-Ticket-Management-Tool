import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerValidator } from "../validators/auth.validator.js"
import { loginValidator } from "../validators/auth.validator.js"

import {
    registerUser,
    loginUser,
    logoutUser,
    getUser
} from "../controllers/auth.controller.js"

const router = Router()

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.post("/logout", verifyJwt, logoutUser);
router.get("/me", verifyJwt, getUser);

export default router
