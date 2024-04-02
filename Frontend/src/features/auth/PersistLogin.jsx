import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRefreshMutation } from "./authApiSlice";
import { Container, Spinner } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import DisplayError from "../../config/DisplayError";
import { useDispatch } from "react-redux";
import { setAccessToken } from "./authSlice";
export function PersistLogin() {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
  const { accessToken: token } = useAuth();
  const [refresh, { isLoading, isError, error, isSuccess }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const res = await refresh();
        const accessToken = res?.data?.accessToken;
        if (accessToken) {
          console.log("Got new accessToken");
          dispatch(setAccessToken({ accessToken }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!token && isLoggedIn) {
      console.log("Verifying refresh token");
      verifyRefreshToken();
    }
  }, []);

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center m-1">
        <Spinner />
      </Container>
    );
  }

  if (token) {
    return <Outlet />;
  }

  if (isError) {
    console.log("User does not have valid token");
    return (
      <Container className="d-flex justify-content-center">
        <DisplayError error={error} />
        <Link className="mx-1" to="/login">
          Please Login again
        </Link>
      </Container>
    );
  }

  if (!isLoggedIn) {
    console.log("User is not logged in");
    return <Outlet />;
  }
}
