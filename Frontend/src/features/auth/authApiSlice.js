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
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "get",
            }),
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "post",
            }),
            
        }),
    }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
    authApiSlice;
