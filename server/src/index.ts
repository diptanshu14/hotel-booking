import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users.routes"

mongoose.connect(process.env.DB_URI as string).then(()=>{
    console.log("Server is connected to Database")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/users", userRoutes)

app.listen(7000, () => {
    console.log("Server is running on localhost:7000")
})