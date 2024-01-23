import { Container, Row, Col } from "react-bootstrap"
import { useGetUserQuery, useGetUsersQuery } from "./usersApiSlice"
const UsersList = () => {
const {data:users, isError,  isLoading,isSuccess, error} = useGetUsersQuery()
let content;
console.log(error)
if(isLoading){
    content = <div>loading...</div>
}else if(isSuccess){
    content = users.map(user=> <><p key={user._id}>{user.username}</p></>)
}
else if(isError){
    content = <div> {error.error.toString()}</div>
}


    return <>
<Container >
    <h2>UsersList</h2>
    <div className="user-list">
    {content}

    </div>
</Container>
</>
    
}
export default UsersList