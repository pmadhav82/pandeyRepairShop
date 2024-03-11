import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetCurrentUserQuery } from "../users/usersApiSlice";
import { setUserInfo } from "./authSlice";
const ProtectedRoute = ()=>{
const{isSuccess, isLoading, data:userInfo} = useGetCurrentUserQuery();
const dispatch = useDispatch();
const {username} = useAuth();




useEffect(()=>{

    if(userInfo && !username){

        dispatch(setUserInfo({userInfo}))
    }
    
},[userInfo, username, dispatch  ])


  




if(isLoading) {

  return <Container className="d-flex justify-content-center">
    <Spinner/>
  </Container>
    
}




 if(isSuccess && username){
  
    return <Outlet/>
}


 return  <Navigate to = "/login" replace/>
    }





export default ProtectedRoute;