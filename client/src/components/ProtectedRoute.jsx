import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

function ProtectedRoute() {
    const { isAuth, isCheckingAuth } = useAuthStore();
    if (isCheckingAuth) return <div>Loading...</div>;
    if (!isAuth) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export default ProtectedRoute