import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }
    
    try {
        let user = await User.findOne({ email: req.body.email, })
        if (user) {
            return res.status(409).json({ message: "User already exists" })
        }

        user = new User(req.body)
        await user.save()

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string, 
            { expiresIn: "1d" } 
        )

        return res.status(201).cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        }).json({ message: "User registered successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}