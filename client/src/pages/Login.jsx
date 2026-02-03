import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const Login = () => {
    const { login, isLoading } = useAuthStore();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(userData)
            toast.success("User Login");
            navigate("/");
        } catch (error) {
            toast.error("Login failed")
        }

    }
    return (
        <form onSubmit={handleLogin}>
            <input type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="" />

            <input type="password"
                placeholder="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                className="" />

            <button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                        Login...
                    </>
                ) : (
                    "Login"
                )}
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
                you have already account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Register
                </Link>
            </p>
        </form>
    )
}

export default Login