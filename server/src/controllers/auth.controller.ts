import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req: Request, res:Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    const { email, password } = req.body
    
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string, 
            { expiresIn: "1d" } 
        )

        return res.status(200).cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        }).json({ userId: user._id })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}