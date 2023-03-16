import ButtonPrimary from "../../components/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import DisplayError from "../../components/DisplayError";

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

        // Server error
        if (!err.response || err.response.status >= 500)
          setErrorText(
            "There was a problem registering your account, please try again later"
          );
        else if (err.response.status >= 400) setErrorText(err.response.data);
      });
  };

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <div className="w3-section w3-margin-left w3-margin-right">
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
        <p>
          Already have an account? Click <Link to="/login">here</Link> to log
          in!
        </p>
      </div>
    </>
  );
}

export default FormRegister;
