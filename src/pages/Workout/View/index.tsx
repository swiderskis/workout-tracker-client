import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import useErrorResponse from "../../../hooks/useErrorResponse";
import DisplayError from "../../../components/DisplayError";
import { Link, Navigate } from "react-router-dom";

interface RoutineDetails {
  routineId: number;
  startDate: Date;
  endDate: Date;
}

function ViewRoutines() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [routineList, setRoutineList] = useState<RoutineDetails[]>([]);

  const getRoutines = async () => {
    await axios
      .get(`/workout/routine-list`, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        setRoutineList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });

    setLoading(false);
  };

  useEffect(() => {
    getRoutines();
  }, []);

  if (loading) return <Loading />;

  if (isError) return <DisplayError text={errorText} />;

  if (routineList.length === 0) {
    return (
      <p>
        No routines added, click <Link to="/workout/create-routine">here</Link>{" "}
        to create one!
      </p>
    );
  }

  if (routineList.length === 1) {
    return (
      <Navigate
        to={`/workout/routine?routine-id=${routineList[0].routineId}`}
      />
    );
  }

  return (
    <>
      <table className="w3-table w3-striped w3-centered">
        <thead>
          <tr className="w3-light-grey">
            <td>Start Date</td>
            <td>End Date</td>
            <td>View</td>
          </tr>
        </thead>
        <tbody>
          {routineList.map((element) => (
            <tr key={element.routineId}>
              <td>
                {`${element.startDate}`.substring(8, 10)}/
                {`${element.startDate}`.substring(5, 7)}/
                {`${element.startDate}`.substring(0, 4)}
              </td>
              <td>
                {`${element.endDate}`.substring(8, 10)}/
                {`${element.endDate}`.substring(5, 7)}/
                {`${element.endDate}`.substring(0, 4)}
              </td>
              <td>
                <Link to={`/workout/routine?routine-id=${element.routineId}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewRoutines;
