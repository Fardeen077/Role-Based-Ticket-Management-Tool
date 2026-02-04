import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { validateLogin } from "../validations/auth.validations";

const Login = () => {
    const { login, isLoading } = useAuthStore();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const validation = validateLogin(userData);
        if (!validation.ok) {
            toast.error(validation.message);
            return;
        }
        try {
            await login(userData);
            toast.success("Login successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.message)
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white text-gray-800 w-80 rounded-2xl shadow-2xl">
                <form onSubmit={handleLogin} className="flex flex-col w-full gap-6 p-6">
                    <div className="text-center mb-2">
                        <h1 className="text-2xl font-semibold">Welcome Back</h1>
                        <p className="text-sm text-gray-500">
                            Please login to your account
                        </p>
                    </div>
                    <input type="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="p-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-0
                   focus:border-gray-500" />

                    <input type="password"
                        placeholder="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        className="p-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-0
                   focus:border-gray-500" />

                    <button type="submit" disabled={isLoading} className="bg-black text-white p-2 rounded transition-colors cursor-pointer">
                        {isLoading ? (
                            <>
                                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-2" />
                                Login...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        you don't have account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login