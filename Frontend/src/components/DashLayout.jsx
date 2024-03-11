import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {


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
