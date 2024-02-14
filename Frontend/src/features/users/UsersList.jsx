import {  ListGroup, Spinner } from "react-bootstrap";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import DisplayError from "../../config/DisplayError";
const UsersList = () => {
  const {
    data: users,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;

  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    content = (
      
        <ListGroup as="ol" numbered>
        {users?.length
          ? users.map((user) => <User user={user} key={user._id} />)
          : null}
      </ListGroup>
    );
  } else if (isError) {
    content = <DisplayError error={error}/>
  }

  return (
    <>
      
        <h2>UsersList</h2>

        {content}
    
    </>
  );
};
export default UsersList;
