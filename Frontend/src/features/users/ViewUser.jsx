import { useParams } from "react-router-dom";
import { getUserById } from "./usersApiSlice";
import { Spinner } from "react-bootstrap";
import DeleteUser from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
const ViewUser = () => {
  const { userId } = useParams();
  const user = getUserById(userId); 
  const {username, roles, isActive} = user;
  const userRoles = roles?.toString().replaceAll(",", ", ");
  let content = (
    <section>
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-md-9 col-lg-7 col-xl-5">
            <div className="card">
              <div className="card-body p-2">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
             
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{username}</h5>
                 
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"

                    >
                      <div className="mx-2">
                        <p className="small text-muted mb-1">Status</p>
                        <p className="mb-0">{isActive? "Active": "Inactive"}</p>
                      </div>
                      <div className="mx-2">
                        <p className="small text-muted mb-1">Roles</p>
                        <p className="mb-1" >
                    {userRoles}
                    </p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                    <EditUserModal user={user} />
                    <DeleteUser username = {username}  userId={userId}/>
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
  return <> {username? content:<Spinner animation="border"/> } </>;
};

export default ViewUser;
