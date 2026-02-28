import express from 'express'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import cors from "cors"
import uploadRoutes from "./routes/cloudinary.js"


dotenv.config()

const app = express()
app.use(cors())

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary env variables")
}

cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

app.use("/api",  uploadRoutes)

const PORT = process.env.PORT || 5050

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Utlis service is running on port ${PORT}`);
})
