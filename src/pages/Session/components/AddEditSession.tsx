import { Fragment, useEffect, useState } from "react";
import SessionExerciseElement from "./SessionExerciseElement";
import {
  SessionDetails,
  SessionExercise,
} from "../../../interfaces/SessionInformation";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import TextInput from "../../../components/Form/TextInput";
import ButtonSpan from "../../../components/Button/ButtonSpan";

interface AddEditSessionProps {
  session: SessionDetails;
  setIsError: (isError: boolean) => void;
  setErrorText: (errorText: string) => void;
}

function AddEditSession(props: AddEditSessionProps) {
  const [session, setSession] = useState(props.session);

  // Updates name of session
  const setSessionName = (name: string) => {
    const currSession = structuredClone(session);

    currSession.name = name;

    setSession(currSession);
  };

  // Update session exercise weight
  const updateSessionExerciseWeight = (
    weight: number,
    exerciseIndex: number,
    weightIndex: number
  ) => {
    const currSession = structuredClone(session);

    currSession.exercises[exerciseIndex].weight[weightIndex] = weight;

    setSession(currSession);
  };

  // Update session exercise reps
  const updateSessionExerciseReps = (
    reps: number,
    exerciseIndex: number,
    repsIndex: number
  ) => {
    const currSession: SessionDetails = structuredClone(session);

    currSession.exercises[exerciseIndex].reps[repsIndex] = reps;

    setSession(currSession);
  };

  // Adds a set to the exercise
  const addSet = (exerciseIndex: number) => {
    const currSession: SessionDetails = structuredClone(session);

    currSession.exercises[exerciseIndex].weight.push(0);
    currSession.exercises[exerciseIndex].reps.push(-1);

    setSession(currSession);
  };

  // Removes selected set from exercise
  const removeSet = (exerciseIndex: number, setIndex: number) => {
    if (session.exercises[exerciseIndex].weight.length === 1) {
      props.setIsError(true);
      props.setErrorText(
        "Each exercise in the session must contain at least one set"
      );

      return;
    }

    const currSession: SessionDetails = structuredClone(session);

    currSession.exercises[exerciseIndex].weight.splice(setIndex, 1);
    currSession.exercises[exerciseIndex].reps.splice(setIndex, 1);

    setSession(currSession);
  };

  // Adds another exercise to the session
  const addExercise = () => {
    const currSession: SessionDetails = structuredClone(session);

    const blankExercise: SessionExercise = {
      exerciseEquipmentLinkId: -1,
      exerciseName: "",
      equipmentId: 0,
      weight: [0],
      reps: [-1],
    };

    currSession.exercises.push(blankExercise);

    setSession(currSession);
  };

  // Removes exercise from session
  const removeExercise = (exerciseIndex: number) => {
    if (session.exercises.length === 1) {
      props.setIsError(true);
      props.setErrorText("Each session must contain at least one exercise");

      return;
    }

    const currSession: SessionDetails = structuredClone(session);

    currSession.exercises.splice(exerciseIndex, 1);

    setSession(currSession);
  };

  useEffect(() => props.setIsError(false), [session]);

  return (
    <>
      <TextInput
        label="Session name"
        name="session-name"
        value={session.name}
        onChange={setSessionName}
      />
      <p />
      {session.exercises.map((element, index) => (
        <Fragment key={element.exerciseEquipmentLinkId}>
          <SessionExerciseElement
            exercise={element}
            exerciseIndex={index}
            updateWeight={updateSessionExerciseWeight}
            updateReps={updateSessionExerciseReps}
            addSet={addSet}
            removeSet={removeSet}
          />
          <p />
          <ButtonSpan
            value="Remove exercise"
            onClick={() => removeExercise(index)}
          />
        </Fragment>
      ))}
      <p />
      <ButtonSecondary value="Add another exercise" onClick={addExercise} />
    </>
  );
}

export default AddEditSession;
