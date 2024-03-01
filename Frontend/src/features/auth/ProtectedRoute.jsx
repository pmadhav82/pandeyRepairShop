import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getUserInfo } from "./authSlice";
const ProtectedRoute = ()=>{
const userInfo = useSelector(getUserInfo);
return userInfo? <Outlet/>: <Navigate to = "/login" replace/>
}

export default ProtectedRoute;