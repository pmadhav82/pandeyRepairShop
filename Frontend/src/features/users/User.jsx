import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
const User = ({ user }) => {
  const { username, roles } = user;
  const navigate = useNavigate();
  const handleView = () => navigate(`/dash/users/${user._id}`);
  if (user) {
    return (
      <>
        
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{username}</div>
          </div> <Button onClick= {handleView}>  View</Button>
        
        </ListGroup.Item>
 
      </>
    );
  } else return null;
};

export default User;
