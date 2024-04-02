import { useSelector } from "react-redux";
import { getAccessToken} from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const accessToken = useSelector(getAccessToken);
  const userInfo = accessToken ? jwtDecode(accessToken).userInfo :null;
  const adminOrManager = ["Admin" , "Manager"];
  const hasAdminOrManagerRole = adminOrManager.some(role=> userInfo?.roles.includes(role));

  return {
    username: userInfo?.username,
    roles: userInfo?.roles,
    userId: userInfo?.userId,
    hasAdminOrManagerRole,
    accessToken,
  };
};

export default useAuth;
