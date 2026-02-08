import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { BsLayoutSidebar } from "react-icons/bs";
import { LuTickets } from "react-icons/lu";
import { useState } from "react";

function Sidebar() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const [desktopOpen, setDesktopOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
        toast.success("Logout successfully");
    };

    return (
        <>
            {/*  MOBILE TOP BAR  */}
            <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-zinc-900 text-white flex items-center justify-between px-4 z-30 border-b border-zinc-800">

                {/* LEFT → MENU BUTTON */}
                <button
                    onClick={() => setMobileOpen(true)}
                    className="text-xl bg-black p-4 rounded"
                >
                    <BsLayoutSidebar />
                </button>

                {/* CENTER → LOGO */}
                <div className="flex items-center gap-2">
                    <LuTickets />
                    <span className="font-semibold">Tickets</span>
                </div>
            </div>


            {/* OVERLAY */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}


            {/*  SIDEBAR */}
            <aside
                className={`
        bg-zinc-900 text-white
        fixed lg:static
        top-0 left-0
        h-full
        z-50
        transform transition-all duration-300

        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0

        ${desktopOpen ? "lg:w-64" : "lg:w-20"}
        w-64
        border-r border-zinc-800
        `}
            >
                <div className="p-4 flex flex-col h-full lg:mt-0">

                    {/* MOBILE SIDEBAR HEADER */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-xl">
                            <LuTickets />
                        </div>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-xl p-2 rounded"
                        >
                            <BsLayoutSidebar />
                        </button>
                    </div>

                    {/* DESKTOP HEADER */}
                    <div className="hidden lg:flex justify-between mb-6 text-2xl items-center">
                        {desktopOpen && <LuTickets />}
                        <button
                            onClick={() => setDesktopOpen(!desktopOpen)}
                            className="hover:bg-zinc-800 p-1 rounded"
                        >
                            <BsLayoutSidebar />
                        </button>
                    </div>

                    {/* LINKS */}
                    <ul className={`space-y-4 flex-1 ${!desktopOpen && "lg:items-center"}`}>
                        <li>
                            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-zinc-300 p-1">
                                <LuTickets />
                                {desktopOpen && <span>Tickets</span>}
                            </Link>
                        </li>

                        <li>
                            <Link to="/ticketsform" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-zinc-300">
                                ➕
                                {desktopOpen && <span>Create Ticket</span>}
                            </Link>
                        </li>
                    </ul>

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 text-zinc-300 ${!desktopOpen && "lg:justify-center"}`}
                    >
                        <IoIosLogOut />
                        {desktopOpen && <span>Logout</span>}
                    </button>

                </div>
            </aside>
        </>
    );

}

export default Sidebar;