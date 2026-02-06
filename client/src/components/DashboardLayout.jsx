import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom";
function DashboardLayout() {
    return (
        <div className="h-screen flex overflow-hidden bg-black">

            {/* sidebar - handles both desktop and mobile */}
            <Sidebar />

            {/* main content */}
            <div className="flex-1 min-w-0">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
export default DashboardLayout