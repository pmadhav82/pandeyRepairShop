import {createSlice } from "@reduxjs/toolkit";

const initialState = {
 userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null,
 
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
setUserInfo: (state, action) =>{
  const {userInfo} = action.payload;
  state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return state;
},
logOut: (state) =>{

    state.userInfo = null;
    localStorage.removeItem("userInfo");
    state.accessToken = null;
    return state;
}
    }
})

export default authSlice.reducer;
export const {logOut, setUserInfo} = authSlice.actions;



export const getUserInfo = (state) => {
 const {userInfo} = state.auth;

    return userInfo
};

