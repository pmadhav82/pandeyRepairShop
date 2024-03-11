import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const DashFooter = () => {
  const navigate = useNavigate();
const {roles, username} = useAuth();

  const goHomeClicked = () => navigate("/dash");

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            
              <p>
                User: <b>{username}</b>{" "}
              </p>
              <p>
                Roles: <b> {roles?.toString().replaceAll(",", ", ")}</b>
   
              </p>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashFooter;
