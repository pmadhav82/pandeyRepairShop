import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from "../features/auth/authSlice";
  const store = configureStore({
    reducer:{
      auth: authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
   
    devTools:true
})
setupListeners(store.dispatch) // all useGetNotesQuery and useGetUsersQuery to refetch data in the background
export default store