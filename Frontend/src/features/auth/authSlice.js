import {createSlice } from "@reduxjs/toolkit";

const initialState = {
 userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
setCredentials: (state, action) =>{
  const {userInfo} = action.payload;
  state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return state;
},
logOut: (state) =>{

    state.userInfo = null;
    localStorage.removeItem("userInfo");
    return state;
}
    }
})

export default authSlice.reducer;
export const {logOut, setCredentials} = authSlice.actions;



export const getCurrentUserInfo = (state) => {
 const {userInfo} = state.auth;

    return userInfo
};