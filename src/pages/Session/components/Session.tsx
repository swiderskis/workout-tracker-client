import { useEffect, useState } from "react";
import DatePick from "../../../components/DatePick";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import AddEditSession from "./AddEditSession";
import { SessionDetails } from "../../../interfaces/SessionInformation";
import axios from "axios";
import useErrorResponse from "../../../hooks/useErrorResponse";

interface SessionProps {
  setIsError: (isError: boolean) => void;
  setErrorText: (errorText: string) => void;
  session?: SessionDetails;
}

const sessionDefault: SessionDetails = {
  name: "",
  date: new Date(),
  exercises: [],
};

function Session(props: SessionProps) {
  const [session, setSession] = useState(
    props.session ? props.session : sessionDefault
  );
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

  // Loads routine session details from saved workout
  // Done when adding new session
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
        props.setIsError(true);
        props.setErrorText(useErrorResponse(err));
      });
  };

  // Sets session details if they are passed to component
  // Done when editing existing session
  const loadSessionFromProp = () => {
    if (props.session) {
      setSession(props.session);
      setShowAddEditSession(true);
    }
  };

  useEffect(() => loadSessionFromProp(), []);

  return (
    <>
      Session date:
      <DatePick startDate={session.date} singleOnChange={changeSessionDate} />
      <p />
      {showAddEditSession ? (
        <AddEditSession
          session={session}
          setSession={setSession}
          setIsError={props.setIsError}
          setErrorText={props.setErrorText}
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
