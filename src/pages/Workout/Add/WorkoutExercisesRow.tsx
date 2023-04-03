import ButtonSpan from "../../../components/Button/ButtonSpan";
import IntegerSelectInput from "../../../components/Form/IntegerSelectInput";
import equipment from "../../../enums/equipment";
import muscleGroup from "../../../enums/muscleGroup";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import { WorkoutExerciseSelection } from "../../../interfaces/WorkoutInformation";
import "../style.css";

interface WorkoutExerciseRowProps {
  exercise: WorkoutExerciseSelection;
  index: number;
  removeExercise: (index: number) => void;
  changeSetsReps: (exercise: WorkoutExerciseSelection) => void;
}

function WorkoutExerciseRow(props: WorkoutExerciseRowProps) {
  const changeSets = (sets: number) => {
    const currWorkoutExercise = props.exercise;

    currWorkoutExercise.sets = sets;

    props.changeSetsReps(currWorkoutExercise);
  };

  const changeReps = (reps: number) => {
    const currWorkoutExercise = props.exercise;

    currWorkoutExercise.reps = reps;

    props.changeSetsReps(currWorkoutExercise);
  };

  return (
    <tr>
      <td>{`${useNameFromEnum(props.exercise.equipmentId, equipment)} ${
        props.exercise.exerciseName
      }`}</td>
      <td className="mobile-hide-column">
        {useNameFromEnum(props.exercise.muscleGroupId, muscleGroup)}
      </td>
      <td>
        <IntegerSelectInput
          value={props.exercise.sets}
          maxValue={10}
          onChange={changeSets}
        />
      </td>
      <td>
        <IntegerSelectInput
          value={props.exercise.reps}
          maxValue={30}
          onChange={changeReps}
        />
      </td>
      <td>
        <ButtonSpan
          value="Remove"
          onClick={() => props.removeExercise(props.index)}
        />
      </td>
    </tr>
  );
}

export default WorkoutExerciseRow;
