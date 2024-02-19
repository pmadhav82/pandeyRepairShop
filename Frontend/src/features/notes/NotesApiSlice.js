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


export const getNoteById = (noteId) => {
 return useGetNotesQuery("getNotesQuery", {

    selectFromResult: (result) => {
      const { isLoading, isSuccess } = result;

      const note = result.data ? result.data.find((note) => note._id === noteId) : [];
      return { isLoading, isSuccess, note }
    }
  })

 }