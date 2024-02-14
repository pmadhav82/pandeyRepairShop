import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useValidation from "../../config/regex";
const NewUserForm = () => {
  const [addNewUser, { isLoading, isError, error, isSuccess }] =
    useAddNewUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([ROLES.Employee]);

const [validUsername, validPassword] = useValidation(username,password);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChange = (e) => {
    const { checked, value } = e.target;
    if (checked && !roles.includes(value)) {
      setRoles([...roles, value]);
    } else {
      let updatedRoles = roles.filter((role) => role !== value);
      setRoles(updatedRoles);
    }
  };

 
  const canSave =
    [validPassword, validUsername, roles.length].every(Boolean) && !isLoading;

  const formHandeler = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setPassword("");
      setUsername("");
      setRoles([ROLES.Employee]);
      navigate("/dash/users");
    }
  }, [isSuccess]);

  const options = Object.values(ROLES).map((role) => {
    return (
      <div key={role} className="form-check">
        <input
          onChange={onRolesChange}
          type="checkbox"
          name="roles"
          checked={roles.includes(role)}
          value={role}
          className="form-check-input m-1"
        />
        <label className="form-check-label">{role}</label>
      </div>
    );
  });

  const content = (
    <>
      <div>
        {isLoading && <Spinner animation="border" />}
        {isError && (
          <p className="text-danger">
            {error?.data?.message || "Something went wrong, try again.."}
          </p>
        )}
      </div>
      <form>
        
        <h2>Add New User</h2>
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
        <div className="form-group mt-1">
          <label>Password</label>
          <input
            onChange={onPasswordChanged}
            type="password"
            value={password}
            name="password"
            autoComplete="on"
            className="form-control  mt-1"
            placeholder="Enter password"
          />
          <small id="passwordHelp" className="form-text text-muted">
            [4-12 chars incl. !@#$%]
          </small>
        </div>
        <div className="form-group mt-1">
          <div className="col-sm-2">Roles</div>
          {options}
        </div>
        <div className="d-grid gap-2 mt-3">
          <button
            type="submit"
            disabled={!canSave}
            onClick={formHandeler}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
  return content;
};
export default NewUserForm;
