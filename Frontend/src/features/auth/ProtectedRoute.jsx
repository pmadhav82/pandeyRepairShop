import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getCurrentUserInfo } from "./authSlice";
const ProtectedRoute = ()=>{
const userInfo = useSelector(getCurrentUserInfo);
return userInfo? <Outlet/>: <Navigate to = "/login" replace/>
}

export default ProtectedRoute;