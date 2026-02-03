import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { validateRegister } from "../validations/auth.validations";

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
        const validation = validateRegister(userData);

        if (!validation.ok) {
            toast.error(validation.message);
            return;
        }
        try {
            await register(userData);
            toast.success("Register successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.message)
        }
    };
    // bg-[#aaaaaa]
    return (
        <div className="bg-[#f4f3ee] text-gray-800 flex w-80 items-center justify-center rounded-2xl mt-40 mx-auto shadow-2xl">
            <form onSubmit={handleRegister} className="flex flex-col gap-6 p-6 w-full">
                <input type="text"
                    placeholder="Username"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="p-2 rounded" />

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

                <button type="submit" disabled={isLoading}
                    className="bg-black text-white p-2 rounded transition-colors cursor-pointer">
                    {isLoading ? (
                        <>
                            <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-2" />
                            Register
                        </>
                    ) : (
                        "Create Account"
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
        </div>

    )
}

export default Register