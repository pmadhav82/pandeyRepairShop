import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setAccessToken } from "../../features/auth/authSlice";
//https://pandeyrepairshop-1.onrender.com

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8000", credentials:"include",
prepareHeaders: (headers, api) =>{

  const {accessToken} = api.getState().auth
if(accessToken){
  headers.set("authorization", `Bearer ${accessToken}`)
}
return headers 

}

})



const baseQueryWithRefreshToken = async (args, api, extraOptions) =>{
let response = await baseQuery(args, api, extraOptions);


if(response?.error?.status === 403){
  console.log("sending refresh token");
  const refreshResponse = await baseQuery("/auth/refresh", api, extraOptions);

  if(refreshResponse?.data){
    const {accessToken} = refreshResponse?.data;
    api.dispatch(setAccessToken({accessToken}));
    console.log("Got new access token");
response = await baseQuery(args,api,extraOptions)


  }else{
    refreshResponse.error.message = "Your login session has expired";
   api.dispatch(logOut())
    console.log("Session expired..")
    return refreshResponse;
  }
  
}
return response
}





export const apiSlice = createApi({
  tagTypes: ["Note", "User"],
baseQuery:baseQueryWithRefreshToken,
  endpoints: (builder) => ({}),
});
