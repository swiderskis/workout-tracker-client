import ButtonPrimary from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import DisplayError from "../../components/DisplayError";
import useErrorResponse from "../../hooks/useErrorResponse";

function FormRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    if (password !== confirmPassword) {
      setIsError(true);
      setErrorText("Your passwords do not match, please try again");
      return;
    }

    // API call to register new user
    await axios
      .post(`/register`, { username, password })
      .then((res) => {
        navigate("/login");
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
        <label htmlFor="confirm-password">Confirm password:</label>
        <br />
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <ButtonPrimary value="Register" />{" "}
      </form>
    </>
  );
}

export default FormRegister;
