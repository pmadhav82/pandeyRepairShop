
import { Container, Button } from "react-bootstrap";
import { JournalCheck, PeopleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const UserWelcome = ()=>{
const date = new Date();
const today = new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"short"}).format(date)
    return<>
    <Container style={{minHeight:"60vh"}}>

    <p>Today is : {today}</p>
    <div className="d-flex">

    <Link to = "notes" className="nav-link p-2"><JournalCheck/>TechNotes</Link>


    <Link className="nav-link p-2" to = "users"><PeopleFill/>Users List</Link>

    </div>


    </Container>
    </>
}

export default UserWelcome