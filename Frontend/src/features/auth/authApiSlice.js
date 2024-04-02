import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credential) => ({
                url: "/auth",
                method: "post",
                body: { ...credential },
            }),
        }),
 

        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "post",
                
            }),
    async onQueryStarted(arg, api){
const {dispatch, queryFulfilled} = api;
try{
await queryFulfilled
dispatch(apiSlice.util.resetApiState())
}catch(er){
    console.log(er)
}
    }
            
        }),

refresh: builder.mutation({
   query: ()=>({
    url: "/auth/refresh",
    method: "get"
   })
})

    }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
    authApiSlice;
