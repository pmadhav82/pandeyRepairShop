import useAuth from "../hooks/useAuth";


export const ROLES = {
  Employee: "Employee",
  Admin: "Admin",
  Manager: "Manager",
};

export const checkRole  =()=>{
  const {roles} = useAuth()
  

  const hasAdminOrManagerRole = roles?.some((role)=> role === ROLES.Admin || ROLES.Manager);
  return hasAdminOrManagerRole;

} 


