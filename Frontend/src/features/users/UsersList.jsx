import { Container, Row, Col } from "react-bootstrap"
import {  useGetUsersQuery } from "./usersApiSlice"
import User from "./User";
const UsersList = () => {
const {data:users, isError,  isLoading,isSuccess, error} = useGetUsersQuery()
let content;

if(isLoading){
    content = <div>loading...</div>

}else if(isSuccess){




    content = (<div className="users-list-container">
<div className="header">Username</div>
<div className="header">Roles</div>
<div className="header">Edit</div>
{users?.length ? users.map(user=> <User user={user} key={user._id} />): null}
    </div>)
}
else if(isError){
    content = <div>{error?.data?.message  || <p>Someting went wrong, try again</p>}</div>
}


    return <>
<Container >
    <h2>UsersList</h2>

    {content}

    
</Container>
</>
    
}
export default UsersList