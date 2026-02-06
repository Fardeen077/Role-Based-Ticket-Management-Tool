import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import TicketsForm from "./components/TicketsForm";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import PublicRoute from "./components/PublicRoute";
import useAuthStore from "./store/useAuthStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";

function App() {
  const { getUser, isLoading } = useAuthStore();

  useEffect(() => {
    getUser();
    console.log("useEffect ran");
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/ticketsform" element={<TicketsForm />} />
          </Route>
        </Route>

        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>


  )
}

export default App
