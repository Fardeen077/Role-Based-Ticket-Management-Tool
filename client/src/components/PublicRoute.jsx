import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

function PublicRoute() {
    const { isAuth, isCheckingAuth } = useAuthStore();
    if (isCheckingAuth) return <div>Loading...</div>;
    if (isAuth) return <Navigate to="/" replace />;
    return <Outlet />;
}


export default PublicRoute