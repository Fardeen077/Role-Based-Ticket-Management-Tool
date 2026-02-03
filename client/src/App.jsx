import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
function App() {


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
