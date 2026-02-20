import { userAppData } from "../context/AppContext"
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { isAuth, loading } = userAppData()

    if (loading) return null;

    return isAuth ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute  