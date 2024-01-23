import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user ",
      providesTags: (result = [], error, arg) => [
        "User",
        ...result.map(({ _id }) => ({ type: "User", id: _id })),
      ],
    }),
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    addNewUser: builder.mutation({
      query: (userDetail) => ({
        url: "/user",
        method: "Post",
        body: userDetail,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
    editUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/user",
        method: "Patch",
        body: updatedUser,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} = usersApiSlice;
