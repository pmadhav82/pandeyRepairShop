import { Spinner } from "react-bootstrap";
import DisplayError from "../../config/DisplayError";
import useAuth from "../../hooks/useAuth";
import Note from "../notes/Note";
import { getNoteByUserId } from "../notes/NotesApiSlice";
import useTitle from "../../hooks/useTitle";
const UserWelcome = () => {


    const {username, userId} = useAuth();
  const {
    isLoading,
    isError,
    error,
    userNotes, 
  } = getNoteByUserId(userId);

  
useTitle(username)
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
  return (
    <>
      <p> {today}</p>

      {isLoading && <Spinner animation="border" />}

      {isError && <DisplayError error={error} />}

      <div className="d-flex flex-wrap">
        
        {userNotes?.length
        ? userNotes.map((note) => <Note note={note} key={note._id} />)
        : null}
  
    </div>
    </>
  );
};

export default UserWelcome;
