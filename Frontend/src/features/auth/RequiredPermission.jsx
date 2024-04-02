import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequiredPermission = ({allowedRoles = []}) =>{

  const {roles} = useAuth()

  return allowedRoles.some((role)=> roles.includes(role)) ? <Outlet/> : <Navigate to= "/dash" replace/>


}

export default RequiredPermission;