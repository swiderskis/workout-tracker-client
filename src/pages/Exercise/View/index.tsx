import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayError from "../../../components/DisplayError";
import muscleGroup from "../../../enums/muscleGroup";
import useErrorResponse from "../../../hooks/useErrorResponse";
import Loading from "../../Loading";
import { ExerciseInformation } from "./ExerciseInformation";

import ExerciseListElement from "./ExerciseListElement";

function ViewExercises() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInformation[]>([]);
  const [search, setSearch] = useState("");
  const [muscleGroupSelection, setMuscleGroupSelection] = useState<number>();

  const loadExercises = async () => {
    await axios
      .get(`/exercise/view`, {
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
  };

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
      {isError ? (
        <DisplayError text={errorText} />
      ) : (
        <>
          <label htmlFor="exercise-search">Search: </label>
          <input
            type="text"
            id="exercise-search"
            name="exercise-search"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <p></p>
          <label htmlFor="muscle-group"> Muscle group: </label>
          <select
            id="muscle-group"
            name="muscle-group"
            onChange={(e) => setMuscleGroupSelection(parseInt(e.target.value))}
          >
            <option value={-1}></option>
            {muscleGroup.map((muscleGroup) => (
              <option key={muscleGroup.key} value={muscleGroup.key}>
                {muscleGroup.value}
              </option>
            ))}
          </select>
          <p></p>
          <table className="w3-table w3-striped w3-centered">
            <thead>
              <tr className="w3-light-grey">
                <td>Exercise name</td>
                <td>Muscle group</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {exerciseInfo.map((exercise) => (
                <tr key={exercise.exerciseId}>
                  {exercise.exerciseName
                    .toLowerCase()
                    .includes(search.toLowerCase()) &&
                  (muscleGroupSelection === -1 ||
                    muscleGroupSelection === exercise.muscleGroupId) ? (
                    <ExerciseListElement {...exercise} />
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ViewExercises;
