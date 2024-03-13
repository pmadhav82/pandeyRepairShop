import { Spinner } from "react-bootstrap";
import DisplayError from "../../config/DisplayError";
import Note from "./Note";
import { useGetNotesQuery } from "./NotesApiSlice";
import useTitle from "../../hooks/useTitle";

const NotesList = () => {
  const {
    data: notes,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });



useTitle("Notes List");
  let content;

  if (isLoading) {
    content = <Spinner animation="border" />;
  }

  if (isError) {
    content = <DisplayError error={error}/>
  }

  if (isSuccess) {
    content = (
      <>
        <div className="d-flex flex-wrap">
        
            {notes?.length
            ? notes.map((note) => <Note note={note} key={note._id} />)
            : null}
      
        </div>
      </>
    );
  }

  return (
    <>
      <h2>notesList</h2>

      {content}
    </>
  );
};
export default NotesList;
