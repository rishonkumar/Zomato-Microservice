import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import restaurantRoutes from "./routes/restaurant.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5040

app.use(express.json())
app.use("/api/restaurant", restaurantRoutes)

app.listen(PORT, () => {
    console.log(`Restaurant service is running on port ${PORT}`);

    connectDb()
})
