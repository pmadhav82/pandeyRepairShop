import { Spinner } from "react-bootstrap";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import DisplayError from "../../config/DisplayError";
import useTitle from "../../hooks/useTitle";

const NewNote = ()=>{
    const {
        data: users,
        isError,
        isLoading,
        isSuccess,
        error,
      } = useGetUsersQuery();
   
   
   
useTitle("New Note Form")

let content;

if (isLoading) {
  content = <Spinner animation="border" />;
} else if (isError) {
    content = <DisplayError error={error}/>
  } else if(isSuccess){
  content =  <NewNoteForm users = {users}/>
  }

    return content;
}

export default NewNote;