import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Note = ({ note }) => {
  const navigate = useNavigate();


  const handleView = () => navigate(`/dash/notes/${note._id}`);
  return (
    <>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{note?.title}</div>
          {note.completed ? (
            <p className="text-success">
              <b>Closed</b>
            </p>
          ) : (
            <p className="text-primary">Open</p>
          )}
        </div>
        <Button onClick={handleView}> View</Button>
      </ListGroup.Item>
    </>
  );
};

export default Note;
