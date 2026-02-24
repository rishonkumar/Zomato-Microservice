import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../main";
import type { AppContextType, LocationData, User } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [location, setLoacation] = useState<LocationData | null>(null)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const [city, setCity] = useState("Fetching Location....")

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token")
            console.log("Inside App context 23")

            const { data } = await axios.get(`${authService}/api/v1/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUser(data)
            setIsAuth(true)


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    //it will be called whenver page is called
    useEffect(() => {
        fetchUser() // Check if user is logged in when app starts
    }, [])

    useEffect(() => {
        if (!navigator.geolocation) return alert("Please allow location to continue")
        setLoadingLocation(true)

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords
            try {
                const res = await fetch(`   https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)

                const data = await res.json()

                setLoacation({
                    latitude,
                    longitude,
                    formattedAdress: data.display_name || "current location "
                })

                setCity(data.address.city || data.address.town || data.address.village || "Your Location")
            } catch (err) {
                setLoacation({
                    latitude,
                    longitude,
                    formattedAdress: "current location "
                })
                setCity("Failed to load")
            }
        })

    }, [])

    return <AppContext.Provider value={{ isAuth, setIsAuth, setLoading, setUser, user, loading, location, city, loadingLocation }}>{children}</AppContext.Provider>
}

export const userAppData = (): AppContextType => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error("useAppData must be used within AppProvider")
    }
    return context;
}