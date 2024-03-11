import { Button, Card, ListGroup } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
const Note = ({ note }) => {
  const navigate = useNavigate();


  const handleView = () => navigate(`/dash/notes/${note._id}`);
  return (
    <>
 

<Card  style={{ width: '18rem', margin:"0.5rem 0.5rem" }} className="border-0 bg-light p-1 mx-1">

        <p>

          {note?.title}

        </p>
        
        

          {note.completed ? (
            <p className="text-success">
              <b>Closed</b>
            </p>
          ) : (
            <p className="text-primary">Open</p>
          )}



        <Button variant="secondary" onClick={handleView}>View <ArrowRight size={20}/></Button>
</Card>
    
    </>
  );
};

export default Note;
