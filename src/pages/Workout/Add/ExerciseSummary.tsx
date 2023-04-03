import { WorkoutExerciseSelection } from "../../../interfaces/WorkoutInformation";

interface ExercisesSummaryProps {
  exercises: WorkoutExerciseSelection[];
}

function ExercisesSummary(props: ExercisesSummaryProps) {
  return (
    <>
      {props.exercises.map((element) => (
        <p key={element.exerciseEquipmentLinkId}>
          {element.exerciseName} - {element.sets}x{element.reps}
        </p>
      ))}
    </>
  );
}

export default ExercisesSummary;
