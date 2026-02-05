import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast';
import { IoIosLogOut } from "react-icons/io";
import { BsLayoutSidebar } from "react-icons/bs";
import { LuTickets } from "react-icons/lu";
import { useState } from 'react';

function Sidebar() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
            toast.success("Logout successfully");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const toggleSidebar = () => {
        setOpen(!open);
    }
    return (
        <div className='flex'>
            <header
                className={`bg-[#999999] h-screen p-4 text-2xl flex flex-col transition-all duration-300
    ${open ? "w-64" : "w-0 overflow-hidden"}`}>
                {open && (
                    <nav className='flex h-full flex-col'>
                        <div className="flex justify-between mb-6">
                            <LuTickets />
                            <BsLayoutSidebar
                                className='cursor-e-resize'
                                onClick={toggleSidebar} />
                        </div>

                        {!open && (
                            <div className="flex justify-between mb-6">
                                <LuTickets />
                                <BsLayoutSidebar
                                    className='cursor-e-resize'
                                    onClick={toggleSidebar} />
                            </div>)}

                        <ul className='flex-1 space-y-4'>
                            <li>
                                <Link to="/">Tickets</Link>
                            </li>
                        </ul>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-left"
                        >
                            <IoIosLogOut />
                            Logout
                        </button>
                    </nav>
                )}
            </header >

            {!open && (
                <div className="p-3">
                    <BsLayoutSidebar
                        className="text-2xl cursor-e-resize"
                        onClick={toggleSidebar}
                    />
                </div>
            )}
        </div>
    )
}

export default Sidebar