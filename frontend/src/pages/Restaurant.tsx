import { useEffect, useState } from "react"
import type { IRestaurant } from "../types"
import { restaurantService } from "../main"
import axios from "axios"
import AddRestaurant from "../components/AddRestaurant"

const Restaurant = () => {

    const [restaurant, setRestaurant] = useState<IRestaurant | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchMyRes = async () => {
        try {
            const { data } = await axios.get(`${restaurantService}/api/restaurant/my`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setRestaurant(data.restaurant || null)

            if (data.token) {
                localStorage.setItem("token", data.token)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyRes()
    }, [])


    if (loading) return (<div className="flex min-h-screen items-center justify-center"><p className="bg-gray-500">Loading you res...</p></div>)

    if (!restaurant) {
        return <AddRestaurant />
    }
    return (
        <div>
            fhlirfrevlu
        </div>
    )
}

export default Restaurant