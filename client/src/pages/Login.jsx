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
        <div className="flex w-80 justify-center items-center mx-auto mt-40 bg-[#f4f3ee] rounded-2xl shadow-2xl">
            <form onSubmit={handleLogin} className="flex flex-col w-full gap-6 p-6">
                <input type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="p-2 rounded" />

                <input type="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    className="p-2 rounded" />

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
    )
}

export default Login