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
import DisplayError from "../../../components/DisplayError";

interface RoutineProps {
  submitAction: (
    routine: WorkoutRoutine,
    setIsError: (value: React.SetStateAction<boolean>) => void,
    setErrorText: (value: React.SetStateAction<string>) => void
  ) => Promise<void>;
  submitButtonValue: string;
  routine?: WorkoutRoutine;
}

function Routine(props: RoutineProps) {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [routine, setRoutine] = useState(props.routine);
  const [hideWorkoutSummary, setHideWorkoutSummary] = useState(false);
  const [daySelection, setDaySelection] = useState(0);

  // Submit routine information to database
  const onSubmit = async () => {
    setIsError(false);

    await props.submitAction(
      routine as WorkoutRoutine,
      setIsError,
      setErrorText
    );
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
  const clearWorkout = (day: number) => {
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

  useEffect(() => {
    if (!props.routine) initialiseRoutine();
  }, []);

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
                    onClick={() => clearWorkout(element.day)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w3-padding-small">
            <ButtonPrimary value={props.submitButtonValue} onClick={onSubmit} />
          </div>
        </>
      )}
    </>
  );
}

export default Routine;
