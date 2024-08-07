import express from "express"
import { check } from "express-validator"
import { login, logout, validateToken } from "../controllers/auth.controller"
import verifyToken from "../middlewares/auth.middleware"

const router = express.Router()

router.post("/login", [
    check("email", "Email is Required").isEmail(),
    check("password", "Password should contain atleast 6 characters").isLength({ min: 6 }),
  ], login
)
router.get("/validate-token", verifyToken, validateToken)
router.post("/logout", logout)

export default router