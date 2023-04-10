import { useEffect, useState } from "react";
import Loading from "../../Loading";
import DisplayError from "../../../components/DisplayError";
import axios from "axios";
import useErrorResponse from "../../../hooks/useErrorResponse";
import useFormatDate from "../../../hooks/useFormatDate";
import ButtonSpan from "../../../components/Button/ButtonSpan";
import { Link, useNavigate } from "react-router-dom";

interface SessionList {
  sessionId: number;
  name: string;
  date: Date;
}

function ViewSessions() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sessionList, setSessionList] = useState<SessionList[]>([]);
  const navigate = useNavigate();

  const getSessionList = async () => {
    await axios
      .get(`/session/list`, {
        headers: { token: localStorage.token },
      })
      .then((res) => {
        setSessionList(res.data);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });

    setLoading(false);
  };

  useEffect(() => {
    getSessionList();
  }, []);

  if (loading) return <Loading />;

  if (isError) return <DisplayError text={errorText} />;

  if (sessionList.length === 0) {
    return (
      <p>
        No sessions added, click <Link to="/session/log">here</Link> to create
        one!
      </p>
    );
  }

  return (
    <>
      <table className="w3-table w3-striped w3-centered">
        <thead>
          <tr className="w3-light-grey">
            <td>Session Name</td>
            <td>Session Date</td>
            <td>View</td>
          </tr>
        </thead>
        <tbody>
          {sessionList.map((element) => (
            <tr key={element.sessionId}>
              <td>{element.name}</td>
              <td>{useFormatDate(element.date)}</td>
              <td>
                <ButtonSpan
                  value="View"
                  onClick={() =>
                    navigate(`/session/edit?session-id=${element.sessionId}`)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewSessions;
