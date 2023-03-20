import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useErrorResponse from "../../../hooks/useErrorResponse";
import Loading from "../../Loading";
import { ExerciseInformation } from "./ExerciseInformation";

import ExerciseListElement from "./ExerciseListElement";

function ViewExercises() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInformation[]>([]);

  async function loadExercises() {
    await axios
      .get("/exercise/view", {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        setExerciseInfo(res.data);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });

    setLoading(false);
  }

  useEffect(() => {
    loadExercises();
  }, []);

  if (loading) return <Loading />;

  if (exerciseInfo.length === 0)
    return (
      <p>
        No exercises added, click <Link to="/exercise/add">here</Link> to add
        one now!
      </p>
    );

  return (
    <>
      <table className="w3-table w3-striped w3-centered">
        <thead>
          <tr className="w3-light-grey">
            <td>Exercise name</td>
            <td>Muscle group</td>
            <td>Actions</td>
          </tr>
        </thead>
        {isError ? null : (
          <tbody>
            {exerciseInfo.map((exercise) => (
              <tr key={exercise.exerciseId}>
                <ExerciseListElement {...exercise} />
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default ViewExercises;
