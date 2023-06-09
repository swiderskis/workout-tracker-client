import ButtonPrimary from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DisplayError from "../../components/DisplayError";
import useErrorResponse from "../../hooks/useErrorResponse";
import TextInput from "../../components/Form/TextInput";

function FormLogin() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Submits login details to be checked against database values
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    await axios
      .post(`/login`, { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          value={username}
          onChange={setUsername}
        />
        <p />
        <TextInput
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          password={true}
        />
        <p />
        <ButtonPrimary value="Log in" />
      </form>
    </>
  );
}

export default FormLogin;
