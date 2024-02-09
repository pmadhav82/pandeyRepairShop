
import { Container, Button } from "react-bootstrap";
import { JournalCheck, PeopleFill, PersonPlusFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const UserWelcome = ()=>{
const date = new Date();
const today = new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"short"}).format(date)
    return<>
    <Container>

    <p>Today is : {today}</p>
    <div className="d-flex g-2">

    <Link to = "notes" className="nav-link p-1 bg-success text-white rounded m-1"><JournalCheck/>TechNotes</Link>


    <Link className="nav-link p-1 bg-primary text-white rounded m-1" to = "users"><PeopleFill/>Users List</Link>
    <Link className="nav-link p-1  bg-dark text-white rounded m-1 " to = "users/new"> <PersonPlusFill/> Add New User</Link>
    <Link className="nav-link p-1  bg-secondary text-white rounded m-1 " to = "notes/new"> <PersonPlusFill/> Add New Note</Link>

    </div>


    </Container>
    </>
}

export default UserWelcome