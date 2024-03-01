import { useNavigate, useLocation } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";
const DashFooter = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(getUserInfo);
  const { pathname } = useLocation();

  const goHomeClicked = () => navigate("/dash");

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <div className="d-flex p-2">
              {pathname !== "/dash" && (
                <button onClick={goHomeClicked}>
                  <HouseFill size={20} />
                </button>
              )}
              <p className="mx-1">
                Current User: <b>{userInfo?.username}</b>{" "}
              </p>
              <p className="mx-1">
                Roles: <b> {userInfo?.roles?.toString().replaceAll(",", ", ")}</b>
   
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashFooter;
