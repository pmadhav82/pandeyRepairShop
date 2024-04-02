import { apiSlice } from "../../app/api/apiSlice";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/note",
      providesTags: (result, error, arg) =>{
        if(result){

          
      return    [
            "Note",
            ...result?.map(({ _id }) => ({ type: "Note", id: _id }))
          ]
        }else{
          return [{type:"Note"}]
        }
    }
    }),




    addNewNote: builder.mutation({
      query: (noteDetail) => ({
        url: "/note",
        method: "Post",
        body: { ...noteDetail }
      }),
      invalidatesTags: ["Note"],
    }),
    editNote: builder.mutation({
      query: (updatedNoteDetail) => ({
        url: "/note",
        method: "Put",
        body: {...updatedNoteDetail},
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg._id }],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: "/note",
        method: "Delete",
        body: { id: noteId }
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg._id }],
    }),
  }),
});





export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;





export const getNoteByUserId = (userId) =>{

  return useGetNotesQuery(undefined,{
selectFromResult: ({isLoading, isSuccess, isError, error, data})=>{
const userNotes = data? data.filter((note)=> note.user._id === userId) : [];

return {
  isLoading,
  isSuccess,
  error,
  isError,
  userNotes
}
}

  })

}



export const getNoteById = (noteId) => {
 return useGetNotesQuery(undefined, {

    selectFromResult: (result) => {
      const { isLoading, isSuccess } = result;

      const note = result?.data ? result?.data.find((note) => note._id === noteId) : [];
      return { isLoading, isSuccess, note }
    }
  })

 }

