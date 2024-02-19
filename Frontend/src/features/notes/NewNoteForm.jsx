import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAddNewNoteMutation } from "./NotesApiSlice";
import DisplayError from "../../config/DisplayError";
import { useNavigate } from "react-router-dom";
import useToast from "../../config/useToast";
const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error, data }] =
    useAddNewNoteMutation();

    const navigate = useNavigate();
  
  const showToastMessage = useToast();


  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0]._id);


  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onUserIdChange = (e) =>
    setUserId(e.target.value);


    useEffect(()=>{
      if(isSuccess){
      showToastMessage(data?.message);
      navigate("/dash/notes");
      }
      },[isSuccess, navigate])
     
     
  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const formHandeler = async(e) => {
    e.preventDefault();
    if (canSave) {
      const noteDetail = {title,text,user:userId}
      await addNewNote(noteDetail)
    }
 
  };

  const options = users?.map((user) => {
    return (
      <option key={user._id} value={user._id}>

        {user.username}
      </option>
    );
  });

  const content = <>
    <div>

      {isError && <DisplayError error={error}/>}
    </div>
    
    <Form>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={title}
          onChange={onTitleChange}
          type="text"
          placeholder="Title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Assign task to</Form.Label>
        <Form.Select
          name="username"
          value={userId}
          onChange={onUserIdChange}

        >

          {options}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3"></Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="text" 
          value={text}
          onChange={onTextChange}
          as="textarea"
          rows={3}
        />
      </Form.Group>

      <Button
        disabled={!canSave}
        onClick={formHandeler}
        variant="primary"
        type="submit"
      >
        Create New Note
      </Button>
    </Form>
</>

  return <>{content} </>;
};
export default NewNoteForm;
