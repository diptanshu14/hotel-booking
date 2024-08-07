import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.routes"
import authRoutes from "./routes/auth.routes"

mongoose.connect(process.env.DB_URI as string).then(()=>{
    console.log("Server is connected to Database")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(7000, () => {
    console.log("Server is running on localhost:7000")
})