import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DisplayError from "../../config/DisplayError";
import { useNavigate } from "react-router-dom";
import useToast from "../../config/useToast";
import { useDeleteNoteMutation } from "./NotesApiSlice";

const DeleteNoteModal = ({ noteId }) => {
  const [deleteNote, { isError, error, isLoading, isSuccess, data }] =
    useDeleteNoteMutation();

    const navigate = useNavigate();
    const showToastMessage = useToast();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteNoteHandeler = async () => {
    await deleteNote(noteId)
  }

  useEffect(() => {
    if (isSuccess) {
      showToastMessage(data?.message)
      navigate("/dash/notes");
      handleClose();
    }
  }, [isSuccess, navigate]);

  return <>
     <Button
        variant="btn btn-outline-primary"
        className=" flex-grow-1 mx-1"
        onClick={handleShow}
      >
        Delete
      </Button>
  
  
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete this note?
          {isError && <DisplayError error={error} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            disabled={isLoading}
            onClick={deleteNoteHandeler}
            variant="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  
  </>;
};
 export default DeleteNoteModal