import express from "express"
import { check } from "express-validator"
import { login } from "../controllers/auth.controller"

const router = express.Router()

router.post("/login", [
    check("email", "Email is Required").isEmail(),
    check("password", "Password should contain atleast 6 characters").isLength({ min: 6 }),
  ], login
)

export default router