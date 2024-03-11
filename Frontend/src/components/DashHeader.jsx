import {
    Container,
    Dropdown
} from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../config/useToast";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";
import {
    HouseFill,
    JournalPlus,
    Journals,
    PeopleFill,
    PersonCircle,
    PersonFillAdd,
} from "react-bootstrap-icons";

const DashHeader = () => {
  const showToastMessage = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const{hasAdminOrManagerRole,username} = useAuth();

  const [sendLogout, { isLoading, error }] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
    const res =  await sendLogout().unwrap();

      dispatch(logOut());
      showToastMessage(res.message);
      navigate("/");
    } catch (er) {
      showToastMessage(error?.data?.message);
      console.log(er);
    }
  };






  return (
    <>
      <Container className=" p-1">
        <div className="d-flex justify-content-start">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <PersonCircle size={30} /> {username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/dash">
                <HouseFill size={30} /> Dashboard
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/dash/notes/new">
                <JournalPlus size={30} /> Add New Note
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/dash/notes">
                
                <Journals size={30} /> View Notes
              </Dropdown.Item>

        {hasAdminOrManagerRole && <Dropdown.Item as={Link} to="/dash/users/new">
        <PersonFillAdd size={30} /> Add New User
        </Dropdown.Item>}

              <Dropdown.Item as={Link} to="/dash/users">
                <PeopleFill size={30} /> View Users
              </Dropdown.Item>
              
              <Dropdown.Divider />

              <Dropdown.Item
                as="button"
                onClick={handleLogout}
                disabled={isLoading}
                className=" bg-transparent text-primary"
              >
                {<BoxArrowRight size={30} />} Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

    
      </Container>
    </>
  );
};
export default DashHeader;
