import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../main"
import toast from "react-hot-toast"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc"
import { userAppData } from "../context/AppContext"


const Login = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser, setIsAuth } = userAppData()

    const responsGoogle = async (authResult: any) => {
        setLoading(true)
        try {
            const res = await axios.post(`${authService}/api/v1/auth/login`, {
                code: authResult['code']
            })

            localStorage.setItem("token", res.data.token)
            setUser(res.data.user) 
            toast.success(res.data.message)
            console.log("Succesfully logged in")
            setLoading(false)
            setIsAuth(true)
            navigate("/")
        } catch (err) {
            console.log(err)
            toast.error("Proble while login")
            setLoading(false)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responsGoogle,
        onError: responsGoogle,
        flow: "auth-code"
    })

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm space-y-6">
                <h1 className="text-center text-3xl font-bold text-[#E23774]">Zomatato</h1>

                <p className="text-center text-sm text-gray-500">Log in or sign up to continue</p>

                <button onClick={googleLogin} disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"><FcGoogle size={20} />{loading ? "Sigining in ..." : "Contiune with google"}</button>

                <p className="text-center text-xs text-gray-500">
                    By Continuing you agree with our {" "} <span className="text-[#E23774]">Terms of Service</span> & {" "} <span className="text-[#E23774]">Privacy Policy </span>
                </p>

            </div>
        </div>
    )
}

export default Login