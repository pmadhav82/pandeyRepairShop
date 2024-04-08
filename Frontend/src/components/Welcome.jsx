import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
   
            <h2>
              Welcome to PandeyTechShop - Your Trusted Tech Repair Partner
            </h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>
              Greetings and welcome to PandeyTechShop, your one-stop destination
              for top-notch tech item repair services! At PandeyTechShop, we
              understand the vital role technology plays in your daily life, and
              we're here to ensure that your devices receive the care they
              deserve.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Why Choose PandeyTechShop?</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4> Expert Technicians</h4>
            <p>
              Our team of skilled MERN stack developers, specializing in web
              development, brings a wealth of knowledge and expertise to the
              world of tech repairs.
            </p>
          </Col>
          <Col>
        
           <h4>
             Cutting-Edge Solutions
           </h4>
            <p>
            Embracing the latest technologies, tools,
            and frameworks, we provide innovative and effective solutions to get
            your devices back in optimal condition.  
                </p> 
          </Col>
          <Col>
          <h4>Personalized Service</h4>
<p>
We believe in a personalized approach to every repair, ensuring that each device receives the attention it needs for a swift and reliable recovery.
</p>
          </Col>
        </Row> 

        <Row>
          <Col>
          <h2>Username:Test</h2>
          <h2>Password:Test</h2>
            <Button className="btn btn-secondary m-2">
              <Link className="nav-link" to="/login">
                Employee Login
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
