import Note from "./Note";
import { ListGroup, Spinner } from "react-bootstrap";
import { useGetNotesQuery } from "./NotesApiSlice";
import DisplayError from "../../config/DisplayError";

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
        <div>
        
          <ListGroup as="ol" numbered>    {notes?.length
            ? notes.map((note) => <Note note={note} key={note._id} />)
            : null}</ListGroup>
      
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
