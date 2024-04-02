import {createSlice } from "@reduxjs/toolkit";

const initialState = {
 accessToken: null,

 
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
setAccessToken: (state, action) =>{
  const {accessToken} = action.payload;
  state.accessToken = accessToken;
      return state;
},


logOut: (state) =>{

    state.accessToken = null;
    localStorage.removeItem("isLoggedIn")
    return state;
}
    }
})


export default authSlice.reducer;
export const {logOut, setAccessToken} = authSlice.actions;



export const getAccessToken = (state) => {
 const {accessToken} = state.auth;

    return accessToken
};


