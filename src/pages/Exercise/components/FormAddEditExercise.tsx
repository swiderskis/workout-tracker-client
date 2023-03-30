import React, { useEffect, useState } from "react";
import DisplayError from "../../../components/DisplayError";
import muscleGroup from "../../../enums/muscleGroup";
import equipment from "../../../enums/equipment";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";
import MultiCheckboxInput from "../../../components/Form/MultiCheckboxInput";
import { ExerciseInformation } from "../../../interfaces/ExerciseInformation";

interface FormAddEditExerciseProps {
  submitButtonValue: string;
  submitAction: (
    exerciseName: string,
    muscleGroupSelection: number,
    equipmentSelection: number[],
    setIsError: (value: React.SetStateAction<boolean>) => void,
    setErrorText: (value: React.SetStateAction<string>) => void,
    exerciseId: number
  ) => Promise<void>;
  exerciseInfo?: ExerciseInformation;
}

function FormAddEditExercise(props: FormAddEditExerciseProps) {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [exerciseName, setExerciseName] = useState(
    props.exerciseInfo ? props.exerciseInfo.exerciseName : ""
  );
  const [muscleGroupSelection, setMuscleGroupSelection] = useState(
    props.exerciseInfo ? props.exerciseInfo.muscleGroupId : -1
  );
  const [equipmentSelection, setEquipmentSelection] = useState<number[]>(
    props.exerciseInfo ? props.exerciseInfo.equipmentIds : []
  );
  const [equipmentCheckbox, setEquipmentCheckbox] = useState<boolean[]>(
    new Array(equipment.length).fill(false)
  );

  // Submits new / updated exercise info
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    // Throws error if no muscle group selected
    if (muscleGroupSelection === -1) {
      setIsError(true);
      setErrorText("Please fill in all fields");
      return;
    }

    props.submitAction(
      exerciseName,
      muscleGroupSelection,
      equipmentSelection,
      setIsError,
      setErrorText,
      props.exerciseInfo ? props.exerciseInfo.exerciseId : -1
    );
  };

  // Handles updating state when checkbox is ticked / unticked
  const handleCheckbox = (key: number) => {
    // Toggles if checkbox should be checked or unchecked
    const updateCheckbox = equipmentCheckbox.map((item, index) =>
      index === key ? !item : item
    );

    setEquipmentCheckbox(updateCheckbox);

    // Adds or removes selected equipment based on checkboxes
    const selection = equipmentSelection;

    if (selection.indexOf(key) !== -1) {
      selection.splice(selection.indexOf(key), 1);
    } else {
      selection.push(key);
    }

    setEquipmentSelection(selection);
  };

  // Set whether checkboxes are ticked or unticked when component is loaded
  const setCheckboxes = () => {
    equipmentCheckbox.forEach((_element, index) => {
      equipmentSelection.includes(index)
        ? (equipmentCheckbox[index] = true)
        : null;
    });
  };

  useEffect(() => setCheckboxes(), [equipmentSelection]);

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Exercise name"
          name="exercise-name"
          value={exerciseName}
          onChange={setExerciseName}
        />
        <p />
        <SelectInput
          label="Muscle group"
          name="muscle-group"
          value={muscleGroupSelection}
          onChange={setMuscleGroupSelection}
          enum={muscleGroup}
        />
        <p />
        <MultiCheckboxInput
          label="Equipment"
          enum={equipment}
          checked={equipmentCheckbox}
          onChange={handleCheckbox}
        />
        <ButtonPrimary value={props.submitButtonValue} />
      </form>
    </>
  );
}

export default FormAddEditExercise;
