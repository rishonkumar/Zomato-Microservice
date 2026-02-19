import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../main";
import type { AppContextType, User } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [location, setLoacation] = useState(null)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const [city, setCity] = useState("Fetching Location....")

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token")

            const { data } = await axios.get(`${authService}/api/v1/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUser(data.user)
            setIsAuth(true)


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    //it will be called whenver page is called
    useEffect(() => {
        fetchUser()
    }, [])

    return <AppContext.Provider value={{ isAuth, setIsAuth, setLoading, setUser, user, loading }}>{children}</AppContext.Provider>
}

export const userAppData = (): AppContextType => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error("useAppData must be used within AppProvider")
    }
    return context;
}