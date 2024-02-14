import { useParams } from "react-router-dom";
import { getNoteById } from "./NotesApiSlice";
import { Spinner } from "react-bootstrap";
const ViewNote = () => {
  const { noteId } = useParams();
  const note = getNoteById(noteId);
  const DateFormater = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleString("en-AU", options);
  };
  let content = (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-md-9 col-lg-7 col-xl-5">
            <div className="card">
              <div className="card-body p-3">
                <div className="d-flex text-black">
                  <div className="flex-grow-1 ms-1">
                    <h5 className="mb-1">{note?.title}</h5>
                    <p className="my-2">{note?.text}</p>
                    <div className="d-flex justify-content-start rounded-3 p-1 mb-2 info">
                      <div className="mx-2">
                        <p className="small text-muted mb-1">Status</p>
                        <p className="mb-0">
                        {note.completed ? (
            <p className="text-success">
              <b>Closed</b>
            </p>
          ) : (
            <p className="text-primary">Open</p>
          )}
                        </p>
                      </div>
                      <div className="mx-2">
                        <p className="small text-muted mb-1">Owner</p>
                        <p className="mb-0">{note?.user?.username}</p>
                      </div>
                      <div className="mx-2">
                        <p className="small text-muted mb-1">CreatedAt</p>
                        <p className="mb-0">{DateFormater(note?.createdAt)}</p>
                      </div>
                      <div className="mx-2">
                        <p className="small text-muted mb-1">UpdatedAt</p>
                        <p className="mb-0">{DateFormater(note?.updatedAt)}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        className="btn btn-secondary me-1 flex-grow-1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary  flex-grow-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return <>{note ? content : <Spinner animation="border" />}</>;
};
export default ViewNote;
