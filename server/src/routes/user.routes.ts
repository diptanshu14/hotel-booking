import express from "express"
import { login, register, validateToken } from "../controllers/user.controller"
import { check } from "express-validator"
import verifyToken from "../middlewares/auth"

const router = express.Router()

router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be of minimum 8 characters").isLength({ min: 8 })
], register)

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be of minimum 8 characters").isLength({ min: 8 })
], login)

router.get("/validate-token", verifyToken, validateToken)

export default router