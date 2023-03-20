import { Link } from "react-router-dom";
import { ExerciseInformation } from "./ExerciseInformation";
import muscleGroup from "../../../enums/muscleGroup";

function ExerciseListElement(exerciseInfo: ExerciseInformation) {
  function muscleGroupNameFromId(id: number) {
    let name = "";

    muscleGroup.forEach((muscleGroup) => {
      muscleGroup.key == id ? (name = muscleGroup.value) : null;
    });

    return name;
  }

  return (
    <>
      <td>{exerciseInfo.exerciseName}</td>
      <td>{muscleGroupNameFromId(exerciseInfo.muscleGroupId)}</td>
      <td>
        <Link to="">View</Link>
        <br />
        <Link to="">Delete</Link>
      </td>
    </>
  );
}

export default ExerciseListElement;
