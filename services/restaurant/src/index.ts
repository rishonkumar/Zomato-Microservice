import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5040

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);

    connectDb()
})
