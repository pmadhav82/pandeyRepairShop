
import {  ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const UserWelcome = ()=>{
const date = new Date();
const today = new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"short"}).format(date)
    return<>
    

    <p>Today is : {today}</p> 
<ListGroup>

<ListGroup.Item   as="li"
          className="d-flex justify-content-between align-items-start" >
    <Link to = "notes" className="nav-link p-2 bg-success text-white rounded mx-1">View TechNotes</Link>
    <Link className="nav-link p-2 bg-primary text-white rounded mx-1" to = "users"> View Users List</Link>

</ListGroup.Item>

<ListGroup.Item   as="li"
          className="d-flex justify-content-between align-items-start" >
    <Link className="nav-link p-2  bg-dark text-white rounded mx-1 " to = "users/new">  Add New User</Link>
    <Link className="nav-link p-2  bg-secondary text-white rounded mx-1 " to = "notes/new">  Add New Note</Link>
   

</ListGroup.Item>
</ListGroup>



    
    </>
}

export default UserWelcome