import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user ",
      transformResponse: responseData =>  responseData,
      providesTags: (result, error, arg) =>{
if(result){
  return [
   "User",
   ...result?.map(({ _id }) => ({ type: "User", id: _id })),
  ]

}else{
  return [ {type:"User"}]
}

        
      }
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
        body: { ...updatedUser },
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
 
  useAddNewUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = usersApiSlice;
