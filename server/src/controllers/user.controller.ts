import { Request, Response } from "express"
import { validationResult } from "express-validator"
import * as userServices from "../services/user.service"

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() })
        return
    }

    try {
        const { firstName, lastName, email, password } = req.body
        const result = await userServices.register(firstName, lastName, email, password)

        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true, 
                sameSite: 'strict',
                maxAge: 86400000
            })
        }

        res.status(result.status).json(result.message)
    } catch (error) {
        console.log("Error in register controller: ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() })
        return
    }

    try {
        const { email, password } = req.body
        const result = await userServices.login(email, password)

        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true, 
                sameSite: 'strict',
                maxAge: 86400000
            })
        }

        res.status(result.status).json(result.response)
    } catch (error) {
        console.log("Error in login controller: ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}