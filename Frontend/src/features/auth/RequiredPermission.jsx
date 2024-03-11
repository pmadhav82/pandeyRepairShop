import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { getUserInfo } from "./authSlice"

const RequiredPermission = ({allowedRoles = []}) =>{
    const {roles} = useSelector(getUserInfo);

    

  return allowedRoles.some((role)=> roles.includes(role)) ? <Outlet/> : <Navigate to= "/dash" replace/>


}

export default RequiredPermission;