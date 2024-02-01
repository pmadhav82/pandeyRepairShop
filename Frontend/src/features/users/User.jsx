import { PencilSquare } from "react-bootstrap-icons"
import {  useNavigate } from "react-router-dom"
const User = ({user})=>{
const {username, roles} = user
const navigate = useNavigate()
const handleEdit = ()=> navigate(`/dash/users/${user._id}`)
if(user){

    return <>
    <div>{username}</div>
    <div>{roles.toString().replaceAll(",", ", ")}</div>
    <div> 
     <button onClick={handleEdit} className="btn btn-success">
     {<PencilSquare size={20}/>}Edit
        </button> 
    </div>
    </>

}else return null

}

export default User;