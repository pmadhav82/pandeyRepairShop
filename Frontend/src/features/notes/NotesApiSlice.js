import { apiSlice } from "../../app/api/apiSlice";

 export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/note",
      providesTags: (result = [], error, arg) => [
        "Note",
        ...result.map(({ _id }) => ({ type: "Note", id: _id })),
      ],
    }),
    addNewNote: builder.mutation({
      query: (noteDetail) => ({
        url: "/note",
        method: "Post",
        body: noteDetail,
      }),
      invalidatesTags: ["Note"],
    }),
    editNote: builder.mutation({
      query: (updatedNote) => ({
        url: "/note",
        method: "Patch",
        body: updatedNote,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg._id }],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: "/note",
        method: "Delete",
        body: noteId,
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


 export const getNoteById = (noteId)=>{
    const note = useGetNotesQuery("getNotes",{
        selectFromResult:result=>result.data? result.data.find(note=>note._id === noteId):[]
    })
    return note
 }