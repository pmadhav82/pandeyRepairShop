import { Container,Row, Col, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useToast from "../config/useToast";
import DisplayError from "../config/DisplayError";
import { logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";




const DashHeader = ()=>{
    const showToastMessage = useToast();
const dispatch = useDispatch();
const navigate = useNavigate();

    const [sendLogout,{isLoading, isError, error, data}] = useSendLogoutMutation()


const handleLogout = async()=>{
try{

    await sendLogout().unwrap();
    
        dispatch(logOut());
        showToastMessage(data?.message);
        navigate("/");
}catch(er){
    console.log(er)
}




}

    return <>
    
    <Container>
        <Row>
            {isError && <DisplayError error={error}/>}
            <Col>
            <Button onClick={handleLogout} disabled = {isLoading}>

            {<BoxArrowRight size={30}/>} Logout
            </Button>
            </Col>
        </Row>
    </Container>
    </>
}
export default DashHeader