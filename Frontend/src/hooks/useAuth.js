import { useSelector } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";


const useAuth = ()=>{
const userInfo = useSelector(getUserInfo);
const hasAdminOrManagerRole = userInfo?.roles?.includes("Manager" || "Admin");



return{
  username: userInfo?.username,
  roles: userInfo?.roles,
  userId: userInfo?.userId,
  hasAdminOrManagerRole
    
}

}


export default useAuth;