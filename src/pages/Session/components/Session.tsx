import { useState } from "react";
import DatePick from "../../../components/DatePick";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import AddEditSession from "./AddEditSession";
import { SessionDetails } from "../../../interfaces/SessionInformation";
import DisplayError from "../../../components/DisplayError";
import axios from "axios";
import useErrorResponse from "../../../hooks/useErrorResponse";

const sessionDefault: SessionDetails = {
  name: "",
  date: new Date(),
  exercises: [],
};

function Session() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [session, setSession] = useState(sessionDefault);
  const [showAddEditSession, setShowAddEditSession] = useState(false);

  const changeSessionDate = (date: Date) => {
    const currSession: SessionDetails = structuredClone(session);

    currSession.date = date;

    setSession(currSession);
  };

  // Shows AddEditSession component, loads routine session if desired
  const displaySessionDetails = async (loadSession: boolean) => {
    loadSession ? await loadRoutineSession() : null;

    setShowAddEditSession(true);
  };

  // Loads routine session details
  const loadRoutineSession = async () => {
    const timestamp = session.date.toJSON();
    const date = timestamp.slice(0, 10);

    await axios
      .get(`/session/workout/${date}`, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        const currSession: SessionDetails = structuredClone(session);

        currSession.name = res.data.name;
        currSession.exercises = res.data.exercises;

        setSession(currSession);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      Session date:
      <DatePick startDate={session.date} singleOnChange={changeSessionDate} />
      <p />
      {showAddEditSession ? (
        <AddEditSession
          session={session}
          setIsError={setIsError}
          setErrorText={setErrorText}
        />
      ) : (
        <>
          <ButtonPrimary
            value="Load session from routine"
            onClick={async () => await displaySessionDetails(true)}
          />
          <p />
          <ButtonSecondary
            value="Create custom session"
            onClick={async () => await displaySessionDetails(false)}
          />
        </>
      )}
    </>
  );
}

export default Session;
