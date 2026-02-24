import React, { useState } from 'react'
import { userAppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authService } from '../main'

type Role = "customer" | "rider" | "seller" | null

const SelectRole = () => {

    const [role, setRole] = useState<Role>(null)
    const { setUser } = userAppData()
    const navigate = useNavigate()

    const roles: Role[] = ["customer", "rider", "seller" , null]

    const addRole = async () => {
        try {
            const { data } = await axios.put(`${authService}/api/v1/auth/add/role`,
                { role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            localStorage.setItem("token", data.token)
            setUser(data.user)
            navigate("/", { replace: true })
            console.log("data added successfully", data.user.role)
        } catch (err) {
            alert("Something went wrong")
            console.log(err)
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-white px-4'>
            <div className='w-full max-w-sm space-y-6'>
                <h1 className='text-center text-2xl font-bold'>Choose your role</h1>
                <div className='space-y-4'>
                    {roles.map((r) => (
                        <button key={r} onClick={() => setRole(r)}
                            className={`w-full rounded-xl border px-4 py-3 text-sm font-medium capitalize transition 
                                ${ role === r ? " border-[#E23774] bg-[#E23774] text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
                        >
                            Continue as {r}
                        </button>
                    ))}
                </div>
                <button disabled={!role} onClick={addRole} className={`w-full rounded-xl px-3 py-2 text-sm font-semibold  transition 
                    ${role ? "border-[#E23774] bg-[#E23774] text-white hover:bg[#d32f38]" : "border-gray-200 bg-white text-gray-400 hover:bg-gray-50 cursor-not-allowed"}`}>Next</button>
            </div>

        </div>
    )
}

export default SelectRole