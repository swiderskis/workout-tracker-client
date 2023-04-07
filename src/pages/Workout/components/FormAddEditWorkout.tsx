import { Fragment, useState } from "react";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import ButtonSpan from "../../../components/Button/ButtonSpan";
import DisplayError from "../../../components/DisplayError";
import TextInput from "../../../components/Form/TextInput";
import Modal from "../../../components/Modal";
import day from "../../../enums/day";
import {
  WorkoutExerciseSelection,
  WorkoutRoutineDay,
} from "../../../interfaces/WorkoutInformation";
import ExerciseList from "../../../components/ExerciseModal/ExerciseList";
import WorkoutExerciseRow from "../Add/WorkoutExercisesRow";
import "../style.css";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";

interface FormAddEditWorkoutProps {
  workoutRoutineDay: WorkoutRoutineDay;
  updateRoutineDay: (updatedRoutineDay: WorkoutRoutineDay) => void;
  backClick: () => void;
}

function FormAddEditWorkout(props: FormAddEditWorkoutProps) {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [workoutName, setWorkoutName] = useState(
    props.workoutRoutineDay.workoutName
  );
  const [workoutExercises, setWorkoutExercises] = useState<
    WorkoutExerciseSelection[]
  >(props.workoutRoutineDay.workoutExercises);
  const [modalShown, setModalShown] = useState(false);
  const [modalIsError, setModalIsError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState("");

  // Submits workout details to database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check at least one exercise has been added
    if (workoutExercises.length === 0) {
      setIsError(true);
      setErrorText("Please select at least one exercise for this workout");
      return;
    }

    // Check a valid number of sets / reps has been inputted
    let setsOrRepsInvalid = false;

    workoutExercises.forEach((exercise) => {
      if (exercise.sets < 1 || exercise.reps < 1) {
        setsOrRepsInvalid = true;
      }
    });

    if (setsOrRepsInvalid) {
      setIsError(true);
      setErrorText("Please input sets and reps for all exercises");
      return;
    }

    const updatedRoutineDay: WorkoutRoutineDay = {
      day: props.workoutRoutineDay.day,
      workoutName: workoutName,
      workoutExercises: workoutExercises,
    };

    props.updateRoutineDay(updatedRoutineDay);

    setIsError(false);

    props.backClick();
  };

  // Pushes exercise into workoutExercises state
  const pushExercise = (
    exerciseId: number,
    exerciseName: string,
    muscleGroupId: number,
    exerciseEquipmentLinkId: number,
    equipmentId: number
  ) => {
    // Checks if equipment has been chosen
    if (exerciseEquipmentLinkId === -1 || equipmentId === -1) {
      return {
        success: false,
        errorMessage: "Please choose the equipment for this exercise",
      };
    }

    // Checks if equipment exercise combination has already been added to workout
    let exerciseAdded = false;

    workoutExercises.forEach((exercise) => {
      if (exercise.exerciseEquipmentLinkId === exerciseEquipmentLinkId) {
        exerciseAdded = true;
      }
    });

    if (exerciseAdded)
      return {
        success: false,
        errorMessage:
          "This exercise & equipment combination is already in your workout",
      };

    // Pushes exercise info
    const currentWorkoutExercises = workoutExercises.slice(0);
    const sets = -1;
    const reps = -1;

    currentWorkoutExercises.push({
      exerciseId,
      exerciseName,
      muscleGroupId,
      sets,
      reps,
      exerciseEquipmentLinkId,
      equipmentId,
    });

    setWorkoutExercises(currentWorkoutExercises);

    return { success: true, errorMessage: "" };
  };

  // Handles changing sets & reps when dropdown values are changed
  const changeSetsReps = (exercise: WorkoutExerciseSelection) => {
    const currentWorkoutExercises = workoutExercises.slice(0);

    currentWorkoutExercises.forEach((element, index) => {
      element.exerciseEquipmentLinkId === exercise.exerciseEquipmentLinkId
        ? (currentWorkoutExercises[index] = exercise)
        : null;
    });

    setWorkoutExercises(currentWorkoutExercises);
  };

  const removeExercise = (index: number) => {
    const currentWorkoutExercises = workoutExercises.slice(0);

    currentWorkoutExercises.splice(index, 1);
    setWorkoutExercises(currentWorkoutExercises);
  };

  const modalError = (error: boolean, errorText: string) => {
    setModalIsError(error);
    setModalErrorText(errorText);
  };

  const hideModal = () => {
    setModalShown(false);
  };

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <h3>
        Editing {useNameFromEnum(props.workoutRoutineDay.day, day)}'s workout
      </h3>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Workout name"
          name="workout-name"
          value={workoutName}
          onChange={setWorkoutName}
        />
        <p />
        <label htmlFor="exercises">Exercises:</label>
        <table className="w3-table w3-striped w3-centered" id="exercises">
          <thead>
            <tr className="w3-light-grey">
              <td>Exercise name</td>
              <td className="mobile-hide-column">Muscle group</td>
              <td>Sets</td>
              <td>Reps</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {workoutExercises.map((exercise, index) => (
              <Fragment key={exercise.exerciseEquipmentLinkId}>
                <WorkoutExerciseRow
                  exercise={exercise}
                  index={index}
                  removeExercise={removeExercise}
                  changeSetsReps={changeSetsReps}
                />
              </Fragment>
            ))}
            <tr key={-1}>
              <td />
              <td className="mobile-hide-column" />
              <td />
              <td />
              <td>
                <ButtonSpan value="Add" onClick={() => setModalShown(true)} />
              </td>
            </tr>
          </tbody>
        </table>
        <ButtonPrimary value="Submit" className="w3-margin-top" />
      </form>
      <ButtonSecondary
        value="Back"
        className="w3-margin-top"
        onClick={props.backClick}
      />
      <Modal modalShown={modalShown} hideModal={hideModal}>
        {modalIsError ? <DisplayError text={modalErrorText} /> : <></>}
        <ExerciseList
          modalError={modalError}
          hideModal={hideModal}
          pushExercise={pushExercise}
        />
      </Modal>
    </>
  );
}

export default FormAddEditWorkout;
