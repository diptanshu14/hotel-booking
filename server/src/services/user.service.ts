import User from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { response } from "express"

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    let user = await User.findOne({ email })
    if (user)  return { status: 400, message: "User already exists" }

    user = new User({ firstName, lastName, email, password })
    await user.save()

    const token = jwt.sign({ userId: user.id }, 
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
    )

    return { status: 201, message: "User registered succesfully", token }
}


export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user)  return { status: 400, response: { message: "Invalid Credentials" } }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)  return { status: 400, response: { message: "Invalid Credentials" } }

    const token = jwt.sign({ userId: user.id }, 
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
    )

    return { status: 200, response: { userId: user._id }, token }
}