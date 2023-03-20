import ButtonPrimary from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DisplayError from "../../components/DisplayError";
import useErrorResponse from "../../hooks/useErrorResponse";

function FormLogin() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    // API call to compare login details
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
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <ButtonPrimary value="Log in" />
      </form>
    </>
  );
}

export default FormLogin;
