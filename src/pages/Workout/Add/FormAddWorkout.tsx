import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import DisplayError from "../../../components/DisplayError";
import Modal from "../../../components/Modal";
import day from "../../../enums/day";
import equipment from "../../../enums/equipment";
import muscleGroup from "../../../enums/muscleGroup";
import useErrorResponse from "../../../hooks/useErrorResponse";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import { WorkoutExerciseSelection } from "../../../interfaces/WorkoutExerciseInfo";
import ExerciseListTable from "./ExerciseListTable";

function FormAddWorkout() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDay, setWorkoutDay] = useState(-1);
  const [workoutExercises, setWorkoutExercises] = useState<
    WorkoutExerciseSelection[]
  >([]);
  const [modalShown, setModalShown] = useState(false);
  const [modalIsError, setModalIsError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check at least one exercise has been added
    if (workoutExercises.length === 0) {
      setIsError(true);
      setErrorText("Please select at least one exercise for this workout");
      return;
    }

    // Check a valid day has been selected
    if (workoutDay < 0) {
      setIsError(true);
      setErrorText("Please input a valid day for the workout");
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

    setIsError(false);

    await axios
      .post(
        "/workout/add",
        {
          workoutName,
          workoutDay,
          workoutExercises,
        },
        {
          headers: {
            token: localStorage.token,
          },
        }
      )
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  const pushExercise = (
    exerciseId: number,
    exerciseName: string,
    muscleGroupId: number,
    exerciseEquipmentLinkId: number,
    equipmentId: number
  ) => {
    if (exerciseEquipmentLinkId === -1 || equipmentId === -1) {
      return {
        success: false,
        errorMessage: "Please choose the equipment for this exercise",
      };
    }

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

  const removeExercise = (index: number) => {
    const currentWorkoutExercises = workoutExercises.slice(0);

    currentWorkoutExercises.splice(index, 1);
    setWorkoutExercises(currentWorkoutExercises);
  };

  const changeExerciseSets = (index: number, sets: number) => {
    const currentWorkoutExercises = workoutExercises.slice(0);

    currentWorkoutExercises[index].sets = sets;
    setWorkoutExercises(currentWorkoutExercises);
  };

  const changeExerciseReps = (index: number, reps: number) => {
    const currentWorkoutExercises = workoutExercises.slice(0);

    currentWorkoutExercises[index].reps = reps;
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="workout-name">Workout name:</label>
        <br />
        <input
          type="text"
          id="workout-name"
          name="workout-name"
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <p />
        <label htmlFor="workout-day">Day:</label>
        <br />
        <select
          id="workout-day"
          name="workout-day"
          onChange={(e) => setWorkoutDay(Number(e.target.value))}
        >
          <option key={-1} value={-1}></option>
          {day.map((day) => (
            <option key={day.key} value={day.key}>
              {day.value}
            </option>
          ))}
        </select>
        <p />
        <label htmlFor="exercises">Exercises:</label>
        <table className="w3-table w3-striped w3-centered" id="exercises">
          <thead>
            <tr className="w3-light-grey">
              <td>Exercise name</td>
              <td>Muscle group</td>
              <td>Equipment</td>
              <td>Sets</td>
              <td>Reps</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {workoutExercises.map((exercise, index) => (
              <tr key={exercise.exerciseEquipmentLinkId}>
                <td>{exercise.exerciseName}</td>
                <td>{useNameFromEnum(exercise.muscleGroupId, muscleGroup)}</td>
                <td>{useNameFromEnum(exercise.equipmentId, equipment)}</td>
                <td>
                  <input
                    size={1}
                    style={{ textAlign: "center" }}
                    onChange={(e) =>
                      changeExerciseSets(index, Number(e.target.value))
                    }
                  ></input>
                </td>
                <td>
                  <input
                    size={1}
                    style={{ textAlign: "center" }}
                    onChange={(e) =>
                      changeExerciseReps(index, Number(e.target.value))
                    }
                  ></input>
                </td>
                <td>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      removeExercise(index);
                    }}
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
            <tr key={-1}>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setModalShown(true)}
                >
                  Add
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <ButtonPrimary value="Submit" />
      </form>
      <Modal modalShown={modalShown} hideModal={hideModal}>
        {modalIsError ? <DisplayError text={modalErrorText} /> : <></>}
        <ExerciseListTable
          modalError={modalError}
          hideModal={hideModal}
          pushExercise={pushExercise}
        />
      </Modal>
    </>
  );
}

export default FormAddWorkout;
