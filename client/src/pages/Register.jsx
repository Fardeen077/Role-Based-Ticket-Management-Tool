import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const Register = () => {
    const { register, isLoading } = useAuthStore();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(userData)
            toast.success("User Register");
            navigate("/login");
        } catch {
            toast.error("Register failed");
        }
    }
    return (
        <form onSubmit={handleRegister}>
            <input type="text"
                placeholder="Username"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="" />

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
                        createUser...
                    </>
                ) : (
                    "Account Create"
                )}
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
                you have already account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Login
                </Link>
            </p>
        </form>
    )
}

export default Register