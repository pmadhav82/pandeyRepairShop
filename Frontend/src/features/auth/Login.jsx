import { Container, Form, Button, Spinner} from "react-bootstrap";
import { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import DisplayError from "../../config/DisplayError";
import useToast from "../../config/useToast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "./authSlice";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Login = () => {
const {accessToken:token} = useAuth();

const  {pathname} = useLocation();



const dispatch = useDispatch();
const navigate = useNavigate();
const showToastMessage = useToast();


const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const onUsernameChanged = e => setUsername(e.target.value);
const onPasswordChanged = e => setPassword(e.target.value);

const [login, {isLoading, isError, error}] = useLoginMutation();


 if(pathname == "/login" && token) return <Navigate to="/dash" replace/>


    const onSubmit = async (e) =>{
e.preventDefault();
try{
  const {accessToken} = await login({username, password}).unwrap();
  
  if(accessToken){
    dispatch(setAccessToken({accessToken}));
  showToastMessage("Login successfull");
  setUsername("");
  setPassword("")
  navigate("/dash")
  localStorage.setItem("isLoggedIn",JSON.stringify(true));
  }

}catch(er){
  console.log(er)
}


    }

    return <>
<Container>
    <h1>Login</h1>
    {isError && <DisplayError error = {error}/>}
{isLoading && <div className="d-flex justify-content-center">
  <Spinner/>
  </div>}
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