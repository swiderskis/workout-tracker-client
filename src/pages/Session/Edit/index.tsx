import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../Loading";
import DisplayError from "../../../components/DisplayError";
import axios from "axios";
import useErrorResponse from "../../../hooks/useErrorResponse";
import {
  SessionDetails,
  SessionSubmitDetails,
} from "../../../interfaces/SessionInformation";
import Session from "../components/Session";
import { SubmitParameters } from "../contexts/SubmitParameters";

const sessionDefault: SessionDetails = {
  name: "",
  date: new Date(),
  exercises: [],
};

function EditSession() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionDetails>(sessionDefault);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getSessionDetails = async () => {
    if (!searchParams.get("session-id")) navigate("/session/list");

    await axios
      .get(`/session/${searchParams.get("session-id")}`, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        const sessionDetails: SessionDetails = {
          name: res.data.name,
          date: new Date(res.data.date),
          exercises: res.data.exercises,
        };

        setSession(sessionDetails);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });

    setLoading(false);
  };

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
      .put(`/session/${searchParams.get("session-id")}`, sessionSubmit, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((_res) => {
        navigate("/session/list");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  useEffect(() => {
    getSessionDetails();
  }, []);

  if (loading) return <Loading />;

  if (isError) return <DisplayError text={errorText} />;

  return (
    <SubmitParameters.Provider
      value={{ value: "Update session", onSubmit: handleSubmit }}
    >
      <Session
        setIsError={setIsError}
        setErrorText={setErrorText}
        session={session}
      />
    </SubmitParameters.Provider>
  );
}

export default EditSession;
