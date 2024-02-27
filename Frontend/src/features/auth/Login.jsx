import { Container, Form, Button} from "react-bootstrap";
import { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import DisplayError from "../../config/DisplayError";
import useToast from "../../config/useToast";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const showToastMessage = useToast();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChanged = e => setUsername(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    const [login, {isLoading, isError, error, data}] = useLoginMutation();

    const onSubmit = async (e) =>{
e.preventDefault();
try{
  const {accessToken, userInfo} = await login({username, password}).unwrap();
  if(accessToken){
    dispatch(setCredentials({ userInfo}));
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
<Form>
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
          disabled={false}
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