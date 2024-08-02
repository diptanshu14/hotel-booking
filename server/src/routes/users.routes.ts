import express from "express"
import { check } from "express-validator"
import { register } from "../controllers/users.controller"

const router = express.Router()

// /api/users/register
router.post("/register", [
    check("firstName", "First Name is Required").isString(),
    check("lastName", "Last Name is Required").isString(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password should contain atleast 6 characters").isLength({ min: 6 }),
  ], register
)

export default router