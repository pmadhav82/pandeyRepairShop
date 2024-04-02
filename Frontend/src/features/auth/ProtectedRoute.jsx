import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const ProtectedRoute = () => {

  const { accessToken } = useAuth();

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
