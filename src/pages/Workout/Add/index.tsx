import { useEffect, useState } from "react";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import day from "../../../enums/day";
import FormAddEditWorkout from "../components/FormAddEditWorkout";
import {
  WorkoutRoutine,
  WorkoutRoutineDay,
} from "../../../interfaces/WorkoutInformation";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import ExercisesSummary from "./ExerciseSummary";
import "react-datepicker/dist/react-datepicker.css";
import DatePick from "../components/DatePick";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useErrorResponse from "../../../hooks/useErrorResponse";
import DisplayError from "../../../components/DisplayError";

function AddWorkout() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [routine, setRoutine] = useState<WorkoutRoutine>();
  const [hideWorkoutSummary, setHideWorkoutSummary] = useState(false);
  const [daySelection, setDaySelection] = useState(0);
  const navigate = useNavigate();

  // Submit routine information to database
  const onSubmit = async () => {
    setIsError(false);

    // Check if any workouts are filled in with an exercise
    let exerciseAdded = false;

    routine?.workoutRoutineDays.forEach((element) => {
      element.workoutExercises.length > 0 ? (exerciseAdded = true) : null;
    });

    if (!exerciseAdded) {
      setIsError(true);
      setErrorText("Please add a workout for at least one day in this routine");

      return;
    }

    await axios
      .post(`/workout/create-routine`, routine, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((_res) => {
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  // Initialise routine object
  const initialiseRoutine = () => {
    const workoutRoutineDays: WorkoutRoutineDay[] = [];
    const startDate = new Date();
    const endDate = new Date();

    day.forEach((element) => {
      const routineDay: WorkoutRoutineDay = {
        day: -1,
        workoutName: "Rest Day",
        workoutExercises: [],
      };

      routineDay.day = element.key;

      workoutRoutineDays.push(routineDay);
    });

    setRoutine({ startDate, endDate, workoutRoutineDays });
  };

  // Updates day in routine based on updated info supplied by form
  const updateRoutineDay = (updatedRoutineDay: WorkoutRoutineDay) => {
    const currentRoutine = structuredClone(routine) as WorkoutRoutine;
    const currentRoutineDay = routine?.workoutRoutineDays.slice(
      0
    ) as WorkoutRoutineDay[];

    currentRoutineDay.forEach((element, index) => {
      element.day === updatedRoutineDay.day
        ? (currentRoutineDay[index] = updatedRoutineDay)
        : null;
    });

    currentRoutine.workoutRoutineDays = currentRoutineDay;

    setRoutine(currentRoutine);
  };

  // Clears the workout for a given day
  const clearRoutineDay = (day: number) => {
    const currentRoutine = structuredClone(routine) as WorkoutRoutine;
    const currentRoutineDay = routine?.workoutRoutineDays.slice(
      0
    ) as WorkoutRoutineDay[];

    currentRoutineDay.forEach((element, index) => {
      element.day === day
        ? (currentRoutineDay[index] = {
            day: element.day,
            workoutName: "Rest Day",
            workoutExercises: [],
          })
        : null;
    });

    currentRoutine.workoutRoutineDays = currentRoutineDay;
    setRoutine(currentRoutine);
  };

  // Updates routine start and end dates
  const updateRoutineDates = (startDate: Date, endDate: Date) => {
    const currentRoutine = structuredClone(routine) as WorkoutRoutine;

    currentRoutine.startDate = startDate;
    currentRoutine.endDate = endDate;

    setRoutine(currentRoutine);
  };

  // Set which workout information fills in FormAddEditWorkout, and show the form
  const setAddEditWorkoutDetails = (day: number) => {
    setDaySelection(day);
    setHideWorkoutSummary(true);
    setIsError(false);
  };

  useEffect(() => initialiseRoutine(), []);

  return (
    <>
      {hideWorkoutSummary ? (
        <FormAddEditWorkout
          workoutRoutineDay={
            routine?.workoutRoutineDays[daySelection] as WorkoutRoutineDay
          }
          updateRoutineDay={updateRoutineDay}
          backClick={() => setHideWorkoutSummary(false)}
        />
      ) : (
        <>
          {isError ? <DisplayError text={errorText} /> : null}
          <div className="w3-padding-small">
            Select start & end dates:
            <DatePick
              startDate={routine?.startDate as Date}
              endDate={routine?.endDate as Date}
              onChange={updateRoutineDates}
            />
          </div>
          <div className="w3-row">
            {routine?.workoutRoutineDays.map((element) => (
              <div
                className="w3-col s12 m12 l6 w3-padding-small"
                key={element.day}
              >
                <div key={element.day} className="w3-col w3-border w3-padding">
                  <h4>
                    {useNameFromEnum(element.day, day)} - {element.workoutName}
                  </h4>
                  {element.workoutExercises.length < 1 ? (
                    <p>No exercises selected</p>
                  ) : (
                    <ExercisesSummary exercises={element.workoutExercises} />
                  )}
                  <ButtonPrimary
                    value="Edit"
                    onClick={() => setAddEditWorkoutDetails(element.day)}
                  />
                  <ButtonSecondary
                    value="Clear"
                    className="w3-margin-left"
                    onClick={() => clearRoutineDay(element.day)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w3-padding-small">
            <ButtonPrimary value="Create routine" onClick={onSubmit} />
          </div>
        </>
      )}
    </>
  );
}

export default AddWorkout;
