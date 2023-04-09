import axios from "axios";
import {
  SessionDetails,
  SessionSubmitDetails,
} from "../../../interfaces/SessionInformation";
import Session from "../components/Session";
import { SubmitParameters } from "../contexts/SubmitParameters";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayError from "../../../components/DisplayError";
import useErrorResponse from "../../../hooks/useErrorResponse";

function AddSession() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  // Submit session details to database
  const handleSubmit = async (session: SessionDetails) => {
    // Check at least one exercise is being submitted
    if (session.exercises.length === 0) {
      setIsError(true);
      setErrorText("The session must contain at least one exercise");

      return;
    }

    // Check for blank fields
    let blankFields = false;

    session.exercises.forEach((exercise) => {
      exercise.weight.forEach((weight) => {
        if (weight === 0) {
          blankFields = true;
        }
      });
    });

    if (blankFields) {
      setIsError(true);
      setErrorText("Please input weights for all sets");

      return;
    }

    // session submit object to change date to string
    const sessionSubmit: SessionSubmitDetails = {
      name: session.name,
      date: session.date.toDateString(),
      exercises: session.exercises,
    };

    await axios
      .post(`/session/log`, sessionSubmit, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((_res) => navigate("/"))
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <SubmitParameters.Provider
        value={{ value: "Log session", onSubmit: handleSubmit }}
      >
        <Session setIsError={setIsError} setErrorText={setErrorText} />
      </SubmitParameters.Provider>
    </>
  );
}

export default AddSession;
