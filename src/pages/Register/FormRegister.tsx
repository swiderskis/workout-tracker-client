import ButtonPrimary from "../../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DisplayError from "../../components/DisplayError";
import useErrorResponse from "../../hooks/useErrorResponse";
import TextInput from "../../components/Form/TextInput";

function FormRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  // Submits user details to be added to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    if (password !== confirmPassword) {
      setIsError(true);
      setErrorText("Your passwords do not match, please try again");
      return;
    }

    await axios
      .post(`/register`, { username, password })
      .then((_res) => {
        navigate("/login");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  useEffect(() => {
    setUsername(username.toLowerCase());
  }, [username]);

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
        <br />
        <TextInput
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          password={true}
        />
        <br />
        <TextInput
          label="Confirm Password"
          name="confirm-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          password={true}
        />
        <br />
        <ButtonPrimary value="Register" />{" "}
      </form>
    </>
  );
}

export default FormRegister;
