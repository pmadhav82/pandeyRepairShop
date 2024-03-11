import {createSlice } from "@reduxjs/toolkit";

const initialState = {
 userInfo: null,
 
 
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
setUserInfo: (state, action) =>{
  const {userInfo} = action.payload;
  state.userInfo = userInfo;
      return state;
},
logOut: (state) =>{

    state.userInfo = null;
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

