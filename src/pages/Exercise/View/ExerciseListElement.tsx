import { Link } from "react-router-dom";
import { ExerciseListInfo } from "../../../interfaces/ExerciseInformation";
import muscleGroup from "../../../enums/muscleGroup";
import useNameFromEnum from "../../../hooks/useNameFromEnum";

function ExerciseListElement(exerciseInfo: ExerciseListInfo) {
  return (
    <>
      <td>{exerciseInfo.exerciseName}</td>
      <td>{useNameFromEnum(exerciseInfo.muscleGroupId, muscleGroup)}</td>
      <td>
        <Link to={"/exercise/edit?exercise-id=" + exerciseInfo.exerciseId}>
          Edit
        </Link>
        <br />
        <Link to={"/exercise/delete?exercise-id=" + exerciseInfo.exerciseId}>
          Delete
        </Link>
      </td>
    </>
  );
}

export default ExerciseListElement;
