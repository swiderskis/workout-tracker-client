import { Fragment, useContext, useState } from "react";
import SessionExerciseElement from "./SessionExerciseElement";
import {
  SessionDetails,
  SessionExercise,
} from "../../../interfaces/SessionInformation";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import TextInput from "../../../components/Form/TextInput";
import ButtonSpan from "../../../components/Button/ButtonSpan";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import { SubmitParameters } from "../contexts/SubmitParameters";
import Modal from "../../../components/Modal";
import ExerciseList from "../../../components/ExerciseModal/ExerciseList";
import DisplayError from "../../../components/DisplayError";

interface AddEditSessionProps {
  session: SessionDetails;
  setSession: (session: SessionDetails) => void;
  setIsError: (isError: boolean) => void;
  setErrorText: (errorText: string) => void;
}

function AddEditSession(props: AddEditSessionProps) {
  const [modalShown, setModalShown] = useState(false);
  const [modalIsError, setModalIsError] = useState(false);
  const [modalErrorText, setModalErrorText] = useState("");
  const submitParameters = useContext(SubmitParameters);

  // Updates name of session
  const setSessionName = (name: string) => {
    const currSession = structuredClone(props.session);

    currSession.name = name;

    props.setSession(currSession);
  };

  // Update session exercise weight
  const updateSessionExerciseWeight = (
    weight: number,
    exerciseIndex: number,
    weightIndex: number
  ) => {
    const currSession = structuredClone(props.session);

    currSession.exercises[exerciseIndex].weight[weightIndex] = weight;

    props.setSession(currSession);
  };

  // Update session exercise reps
  const updateSessionExerciseReps = (
    reps: number,
    exerciseIndex: number,
    repsIndex: number
  ) => {
    const currSession: SessionDetails = structuredClone(props.session);

    currSession.exercises[exerciseIndex].reps[repsIndex] = reps;

    props.setSession(currSession);
  };

  // Adds a set to the exercise
  const addSet = (exerciseIndex: number) => {
    const currSession: SessionDetails = structuredClone(props.session);

    currSession.exercises[exerciseIndex].weight.push(0);
    currSession.exercises[exerciseIndex].reps.push(-1);

    props.setSession(currSession);
  };

  // Removes selected set from exercise
  const removeSet = (exerciseIndex: number, setIndex: number) => {
    if (props.session.exercises[exerciseIndex].weight.length === 1) {
      props.setIsError(true);
      props.setErrorText(
        "Each exercise in the session must contain at least one set"
      );

      return;
    }

    const currSession: SessionDetails = structuredClone(props.session);

    currSession.exercises[exerciseIndex].weight.splice(setIndex, 1);
    currSession.exercises[exerciseIndex].reps.splice(setIndex, 1);

    props.setSession(currSession);
  };

  // Adds another exercise to the session
  const pushExercise = (
    _exerciseId: number,
    exerciseName: string,
    _muscleGroupId: number,
    exerciseEquipmentLinkId: number,
    equipmentId: number
  ) => {
    const currSession: SessionDetails = structuredClone(props.session);

    // Checks if equipment has been chosen
    if (exerciseEquipmentLinkId === -1 || equipmentId === -1) {
      return {
        success: false,
        errorMessage: "Please choose the equipment for this exercise",
      };
    }

    // Checks if equipment exercise combination has already been added to workout
    let exerciseAdded = false;

    props.session.exercises.forEach((exercise) => {
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

    const exercise: SessionExercise = {
      exerciseEquipmentLinkId: exerciseEquipmentLinkId,
      exerciseName: exerciseName,
      equipmentId: equipmentId,
      weight: [0],
      reps: [-1],
    };

    currSession.exercises.push(exercise);

    props.setSession(currSession);

    return { success: true, errorMessage: "" };
  };

  // Removes exercise from session
  const removeExercise = (exerciseIndex: number) => {
    if (props.session.exercises.length === 1) {
      props.setIsError(true);
      props.setErrorText("Each session must contain at least one exercise");

      return;
    }

    const currSession: SessionDetails = structuredClone(props.session);

    currSession.exercises.splice(exerciseIndex, 1);

    props.setSession(currSession);
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
      <TextInput
        label="Session name"
        name="session-name"
        value={props.session.name}
        onChange={setSessionName}
      />
      <p />
      {props.session.exercises.map((element, index) => (
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
      <ButtonSecondary
        value={
          props.session.exercises.length === 0
            ? "Add an exercise"
            : "Add another exercise"
        }
        onClick={() => setModalShown(true)}
      />
      <p />
      <ButtonPrimary
        value={submitParameters.value}
        onClick={async () => {
          await submitParameters.onSubmit(props.session);
        }}
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

export default AddEditSession;
