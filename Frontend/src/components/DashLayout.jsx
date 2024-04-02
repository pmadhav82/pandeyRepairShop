import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";
const DashLayout = () => {

  const dispatch = useDispatch();
 
  return (
    <>
      <DashHeader />
      <Container>
      
        <Outlet />
      </Container>

      <DashFooter  />
    </>
  );
};

export default DashLayout;
