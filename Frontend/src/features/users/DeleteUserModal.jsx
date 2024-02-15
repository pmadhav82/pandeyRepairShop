import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDeleteUserMutation } from "./usersApiSlice";
import DisplayError from "../../config/DisplayError";
import { useNavigate } from "react-router-dom";
import useToast from "../../config/useToast";
function DeleteUser({ username, userId }) {
  const navigate = useNavigate();
  const [deleteUser, { isError, isLoading, isSuccess, error, data }] =
    useDeleteUserMutation();

const showToastMessage = useToast();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUserHandeler = async () => {
    await deleteUser(userId);
  }

  useEffect(() => {
    if (isSuccess) {
      showToastMessage(data?.message)
      navigate("/dash/users");
      handleClose();
    }
  }, [isSuccess, navigate]);

  return (
    <>
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete user <b>{username}</b>?
          {isError && <DisplayError error={error} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            disabled={isLoading}
            onClick={deleteUserHandeler}
            variant="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
