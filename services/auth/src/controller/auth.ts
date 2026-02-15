import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/trycatch.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { Oauth2Client } from "../config/googleConfig.js";
import axios from "axios";

export const loginUser = TryCatch(async (req, res) => {

    const { code } = req.body

    if (!code) {
        return res.status(400).json({
            message: "Authorization code is required"
        })
    }

    const googleRespone = await Oauth2Client.getToken(code)
    Oauth2Client.setCredentials(googleRespone.tokens)

    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRespone.tokens.access_token}`)

    const { email, name, image } = userResponse.data;

    let user = await User.findOne({ email })

    if (!user) {
        user = await User.create({
            name,
            email,
            image
        })
    }

    const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
        expiresIn: "15d"
    })

    res.status(200).json({
        message: "Logged in Sucessfully",
        token,
        user
    })
})

const allowedRoles = ["customer", "rider", "seller"] as const
type Role = (typeof allowedRoles)[number]

export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res) => {

    if (!req.user?._id) {
        return res.status(401).json({
            message: "Unauthroized"
        })
    }

    const { role } = req.body as { role: Role }

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Invalid role"
        })
    }

    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
        expiresIn: "15d"
    })

    res.json({ user, token })
})

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = req.user
    res.json(user)
})