import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route path="/" element={<ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>} />
        <Route path="/register" element={<PublicRoute>
          <Register />
        </PublicRoute>} />
        <Route path="/login" element={<PublicRoute>
          <Login />
        </PublicRoute>} />
        <Route path="*" element={<PublicRoute>
          <Login />
        </PublicRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
