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
import ExercisesSummary from "../components/ExerciseSummary";
import "react-datepicker/dist/react-datepicker.css";
import DatePick from "../components/DatePick";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useErrorResponse from "../../../hooks/useErrorResponse";
import DisplayError from "../../../components/DisplayError";
import Routine from "../components/Routine";

function AddRoutine() {
  const navigate = useNavigate();

  // Submit routine information to database
  const handleSubmit = async (
    routine: WorkoutRoutine,
    setIsError: (value: React.SetStateAction<boolean>) => void,
    setErrorText: (value: React.SetStateAction<string>) => void
  ) => {
    // Check end date is after start date
    if (routine.startDate.toDateString() === routine.endDate.toDateString()) {
      setIsError(true);
      setErrorText(
        "Please ensure the selected end date is after the selected start date"
      );

      return;
    }

    // Check if at least one workout is filled in with an exercise
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

  return (
    <Routine submitButtonValue="Create routine" submitAction={handleSubmit} />
  );
}

export default AddRoutine;
