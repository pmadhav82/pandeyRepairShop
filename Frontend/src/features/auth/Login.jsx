import { Container, Form, Button} from "react-bootstrap";
import { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import DisplayError from "../../config/DisplayError";
import useToast from "../../config/useToast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "./authSlice";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfo } from "./authSlice";
const Login = () => {

const userInfo = useSelector(getUserInfo);
const  {pathname} = useLocation();



const dispatch = useDispatch();
const navigate = useNavigate();
const showToastMessage = useToast();


const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const onUsernameChanged = e => setUsername(e.target.value);
const onPasswordChanged = e => setPassword(e.target.value);

const [login, {isLoading, isError, error}] = useLoginMutation();


if(pathname == "/login" && userInfo) return <Navigate to="/dash" replace/>


    const onSubmit = async (e) =>{
e.preventDefault();
try{
  const {userInfo} = await login({username, password}).unwrap();
  if(userInfo){
    dispatch(setUserInfo({userInfo}));
  showToastMessage("Login successfull");
  setUsername("");
  setPassword("")
  navigate("/dash")
  }

}catch(er){
  console.log(er)
}


    }

    return <>
<Container>
    <h1>Login</h1>
    {isError && <DisplayError error = {error}/>}

<Form style={{maxWidth:"700px"}}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={onUsernameChanged}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            autoComplete ="true"
            placeholder='Enter password'
            value={password}
            onChange={onPasswordChanged}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3' onClick={onSubmit}
        >
    Login
        </Button>
      </Form>


</Container>
</>
    
}
export default Login