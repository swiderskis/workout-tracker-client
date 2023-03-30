import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayError from "../../../components/DisplayError";
import muscleGroup from "../../../enums/muscleGroup";
import useErrorResponse from "../../../hooks/useErrorResponse";
import Loading from "../../Loading";
import { ExerciseInformation } from "../../../interfaces/ExerciseInformation";
import ExerciseListElement from "./ExerciseListElement";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";

function ViewExercises() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInformation[]>([]);
  const [search, setSearch] = useState("");
  const [muscleGroupSearch, setMuscleGroupSearch] = useState(-1);

  // Loads exercise information from database
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
          <TextInput
            label="Exercise name"
            name="exercise-search"
            value={search}
            onChange={setSearch}
          />
          <p />
          <SelectInput
            label="Muscle group"
            name="muscle-group"
            value={muscleGroupSearch}
            onChange={setMuscleGroupSearch}
            enum={muscleGroup}
          />
          <p />
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
                <Fragment key={exercise.exerciseId}>
                  {exercise.exerciseName
                    .toLowerCase()
                    .includes(search.toLowerCase()) &&
                  (muscleGroupSearch === -1 ||
                    muscleGroupSearch === exercise.muscleGroupId) ? (
                    <ExerciseListElement {...exercise} />
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ViewExercises;
