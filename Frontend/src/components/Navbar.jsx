import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
const Header = () =>{


    return<>
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
        <Link className="nav-link" to="/">
              PandeyTechShop
              </Link>
              </Navbar.Brand>
   
      </Container>
    </Navbar>
    
    </>
}

export default Header