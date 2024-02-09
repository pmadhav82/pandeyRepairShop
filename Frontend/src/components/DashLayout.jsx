import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Container } from "react-bootstrap";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <Container>
        
        <Outlet />
      </Container>

      <DashFooter />
    </>
  );
};

export default DashLayout;
