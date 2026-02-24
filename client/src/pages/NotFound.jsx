import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function NotFound() {
  const navigate = useNavigate();
  const isAuth = useAuthStore((s) => s.isAuth);

  const handleRedirect = () => {
    if (isAuth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 mx-auto">
      <h1 className="text-4xl font-bold text-white">404 Page Not Found</h1>

      <button
        onClick={handleRedirect}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;