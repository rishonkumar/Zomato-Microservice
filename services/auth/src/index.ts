import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import connectDb from './config/db.js'
import authRoute from './routes/Auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5030

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use("/api/v1/auth", authRoute)

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);

    connectDb()
})
