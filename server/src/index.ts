import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"

import routes from "./routes/routes"

const app = express()

const PORT = process.env.PORT || 7000

mongoose.connect(process.env.DB_CONNECTION_URI as string).then(() => {
    console.log("Server is connected to Database")
}).catch((err) => {
    console.log("Error connecting database to server: ", err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})