import { useEffect, useState } from "react";

import { ROLES } from "../../config/roles";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import { useEditUserMutation } from "./usersApiSlice";
import useValidation from "../../config/regex";
import DisplayError from "../../config/DisplayError";

import useToast from "../../config/useToast";
import { useNavigate } from "react-router-dom";

const EditUserModal = ({ user }) => {
  const [editUser, { isError, error, isLoading, isSuccess, data }] =
    useEditUserMutation();

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setUsername(user?.username);
    setPassword("");
    setActive(user?.isActive);
    setRoles(user?.roles);

    setShow(false);
  };

  const showToastMessage = useToast();

  const handleShow = () => setShow(true);

  const [username, setUsername] = useState(user.username);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.isActive);
  const [password, setPassword] = useState("");
  const [validUsername, validPassword] = useValidation(username, password);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = (e) => setActive(pre => !pre);
  const onRolesChange = (e) => {
    const { checked, value } = e.target;
    if (checked && !roles.includes(value)) {
      setRoles([...roles, value]);
    } else {
      let updatedRoles = roles.filter((role) => role !== value);
      setRoles(updatedRoles);
    }
  };

  let canSave = password
    ? [validPassword, validUsername, roles?.length].every(Boolean) && !isLoading
    : [validUsername, roles?.length].every(Boolean) && !isLoading;

  const formHandeler = async (e) => {
    e.preventDefault();

    const updatedUser = password
      ? { id: user?._id, password, username, roles, isActive: active }
      : { id: user?._id, username, roles, isActive: active };

    await editUser(updatedUser);
  };

  // navigate to users page if form submitted succefully
  useEffect(() => {
    if (isSuccess) {
      showToastMessage(data?.message);
      handleClose();
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const options = Object.values(ROLES).map((role) => {
    return (
      <div key={role} className="form-check">
        <input
          onChange={onRolesChange}
          type="checkbox"
          name="roles"
          checked={roles?.includes(role)}
          value={role}
          className="form-check-input m-1"
        />
        <label className="form-check-label">{role}</label>
      </div>
    );
  });
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
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            {isError && <DisplayError error={error} />}
            <div className="form-group mt-1">
              <label>Username</label>
              <input
                type="text"
                
                onChange={onUsernameChanged}
                value={username}
                name="username"
                className="form-control mt-1"
                placeholder="Enter user name"
              />
              <small id="usernameHelp" className="form-text text-muted">
                [3-20 letters]
              </small>
            </div>

            <Button
              size="sm"
              className="m-1"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Change Password
            </Button>
            <Collapse in={open}>
              <div className="form-group mt-1">
                <label>Password</label>
                <input
                  onChange={onPasswordChanged}
                  type="password"
                  value={password}
                  name="password"
                  autoComplete="on"
                  className="form-control  mt-1"
                  placeholder="Enter new password"
                />
                <small id="passwordHelp" className="form-text text-muted">
                  [4-12 chars incl. !@#$%]
                </small>
              </div>
            </Collapse>
            <div className="form-group mt-1">
              <div className="col-sm-2">Roles</div>
              {options}
            </div>

            <div className="form-group mt-1">
              <div className="col-sm-2">Status</div>
              <div className="form-check form-switch">
  <input onChange={onActiveChanged}  className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked = {active} / >
  <label className="form-check-label" for="flexSwitchCheckChecked">{active? "Active":"Deactivated"}</label>
</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancle
            </Button>
            <Button
              disabled={!canSave}
              type="submit"
              onClick={formHandeler}
              variant="primary"
            >
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditUserModal;
