import { userAppData } from "../context/AppContext"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuth, loading, user } = userAppData()
    const location = useLocation()

    if (loading) return null;


    if (!isAuth) {
        return <Navigate to={"/login"} replace />
    }

    if (!user?.role && location.pathname !== "/select-role") {
        return <Navigate to={"/select-role"} replace />
    }

    if (user?.role && location.pathname === "/select-role") {
        return <Navigate to={"/home"} replace />
    }

    return <Outlet />

}

export default ProtectedRoute  
