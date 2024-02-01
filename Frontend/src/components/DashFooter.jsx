import { useNavigate, useLocation } from "react-router-dom"
import { HouseFill } from "react-bootstrap-icons"
import { Container,Row, Col } from "react-bootstrap"
const DashFooter =() =>{
const navigate = useNavigate()
const {pathname} = useLocation()


const goHomeClicked = ()=> navigate('/dash')

    return <>

<Container className="mt-2">
<Row>
<Col >
{pathname !== "/dash" &&<button onClick={goHomeClicked }><HouseFill/></button> }

</Col>

</Row>

</Container>


    </>
}

export default DashFooter