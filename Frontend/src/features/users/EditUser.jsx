import { useParams } from "react-router-dom"
import { getUserById} from "./usersApiSlice"
import { Container } from "react-bootstrap"
const EditUser = ()=>{
const {userId} = useParams()
const user = getUserById(userId)

     return<>
     <Container>

<h2>Edit User</h2>
<h3>{user.username}</h3>

     </Container>
     </>
}

export default EditUser
