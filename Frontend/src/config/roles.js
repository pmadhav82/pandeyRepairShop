
import { useSelector } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";



export const ROLES = {
  Employee: "Employee",
  Admin: "Admin",
  Manager: "Manager",
};


export const checkRole  =()=>{
  const userInfo = useSelector(getUserInfo);

  const hasAdminOrManagerRole =  userInfo?.roles?.some((role)=> role === ROLES.Admin || ROLES.Manager);
  return hasAdminOrManagerRole;

} 


