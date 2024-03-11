import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DeleteUser from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
const User = ({ user }) => {

const {hasAdminOrManagerRole} = useAuth();


  const { username, roles, isActive, _id } = user;
  const navigate = useNavigate();
  const handleView = () => navigate(`/dash/users/${user._id}`);
  if (user) {
    return (
      <>
        

        <Card style={{ width: '18rem', margin:"0.5rem 0.5rem" }}>
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{roles?.toString().replaceAll(",", ", ")}</Card.Subtitle>
        <Card.Text>
        
                        Status: <b>{isActive? "Active": "Deactivated"} </b>
                    
                      
        </Card.Text>
      { hasAdminOrManagerRole && <div className="d-flex">
      <EditUserModal user={user} />
        <DeleteUser username = {username}  userId={_id}/>
      </div>}
      </Card.Body>
    </Card>


 
      </>
    );
  } else return null;
};

export default User;
