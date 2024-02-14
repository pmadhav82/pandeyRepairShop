import { useEffect, useState } from "react";

const useValidation = (username, password) => {
  const USER_REGEX = /^[A-z]{3,20}$/;
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    setValidPassword(PWD_REGEX.test(password));
  }, [username, password]);
  return[validUsername, validPassword];
};
export default useValidation;