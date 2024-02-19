import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useToast from "../../config/useToast";
import DisplayError from "../../config/DisplayError";
import { useEditNoteMutation } from "./NotesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
const EditNoteModal = ({ note }) => {
  const { data: users, isSuccess: fetchedUsers } = useGetUsersQuery();
  const [editNote, { isSuccess, isLoading, isError, error, data }] =
    useEditNoteMutation();
  const showToastMessage = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(note?.title);
  const [text, setText] = useState(note?.text);
  const [userId, setUserId] = useState(note?.user?._id);
  const [isCompleted, setIsCompleted] = useState(note.completed);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);
  const onIsCompletedChanged = (e) => {
    const { value } = e.target;
    value === "Open" ? setIsCompleted(false) : setIsCompleted(true);
  };
  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const formHandler = async (e) => {
    if (canSave) {
      const updatedNoteDetail = {id:note._id, title,text,user:userId, completed:isCompleted}
      await editNote(updatedNoteDetail)
    }
  };

  const handleClose = () => {
    setTitle(note.title);
    setText(note.text);
    setUserId(note.user._id);
    setIsCompleted(note.completed);
    setShow(false);
  };


  useEffect(()=>{
    if(isSuccess){
    showToastMessage(data?.message);
    navigate("/dash/notes");
    }
    },[isSuccess, navigate])
   

  const handleShow = () => setShow(true);
  const options = fetchedUsers
    ? users?.map((user) => {
        return (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        );
      })
    : null

  return (
    <>
      <Button
        variant="btn btn-secondary"
        className=" flex-grow-1 mx-1"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <div className="p-1">

{isError && <DisplayError error={error}/>}
</div>

        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Check
                value="Open"
                type="radio"
                name="status"
                aria-label="radio 1"
                onChange={onIsCompletedChanged}
                label="Open"
                checked={!isCompleted}
              />
              <Form.Check
                value="Close"
                name="status"
                type="radio"
                aria-label="radio 2"
                onChange={onIsCompletedChanged}
                label="Close"
                checked={isCompleted}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={title}
                type="text"
                onChange={onTitleChange}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Assign task to</Form.Label>
              <Form.Select
                name="username"
                onChange={onUserIdChange}
                value={userId}
              >
                {options}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="text"
                value={text}
                as="textarea"
                rows={3}
                onChange={onTextChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancle
            </Button>
            <Button
              type="submit"
              onClick={formHandler}
              variant="primary"
              disabled={!canSave}
            >
              Update Note
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditNoteModal;
