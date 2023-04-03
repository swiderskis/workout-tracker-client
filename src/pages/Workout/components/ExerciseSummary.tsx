import equipment from "../../../enums/equipment";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import { WorkoutExerciseSelection } from "../../../interfaces/WorkoutInformation";

interface ExercisesSummaryProps {
  exercises: WorkoutExerciseSelection[];
}

function ExercisesSummary(props: ExercisesSummaryProps) {
  return (
    <>
      {props.exercises.map((element) => (
        <p key={element.exerciseEquipmentLinkId}>
          {useNameFromEnum(element.equipmentId, equipment)}{" "}
          {element.exerciseName} - {element.sets}x{element.reps}
        </p>
      ))}
    </>
  );
}

export default ExercisesSummary;
