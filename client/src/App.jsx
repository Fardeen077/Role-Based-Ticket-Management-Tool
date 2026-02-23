import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import TicketsForm from "./components/TicketsForm";
import TicketDetail from "./pages/TicketDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import PublicRoute from "./components/PublicRoute";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const getUser = useAuthStore((s) => s.getUser);
  const isLoading = useAuthStore((s)=> s.isLoading)

  useEffect(() => {
    getUser();
    // console.log("useEffect ran");
  }, [getUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
      </div>
    )
  }
  // ticketdetail
  return (
    <BrowserRouter>
      <Routes>

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/ticketsform" element={<TicketsForm />} />
            <Route path="/ticketdetail/:id" element={<TicketDetail />} />
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
