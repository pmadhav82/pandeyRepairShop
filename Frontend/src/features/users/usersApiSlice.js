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

    addNewUser: builder.mutation({
      query: (userDetail) => ({
        url: "/user",
        method: "Post",
        body: { ...userDetail },
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/user",
        method: "Put",
        body: { ...updatedUser }
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: "/user",
        method: "Delete",
        body: { id: userId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery
} = usersApiSlice;

export const getUserById = (userId) => {
  return useGetUsersQuery("getUsers", {
    selectFromResult: (result) => {
      const { isSuccess } = result;
      const user = result.data ? result.data.find((user) => user._id === userId) : [];
  return{isSuccess,user}  }
  });

};


