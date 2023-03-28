import React, { useState } from "react";
import DisplayError from "../../../components/DisplayError";
import muscleGroup from "../../../enums/muscleGroup";
import equipment from "../../../enums/equipment";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useErrorResponse from "../../../hooks/useErrorResponse";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";
import MultiCheckboxInput from "../../../components/Form/MultiCheckboxInput";

function FormAddExercise() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [muscleGroupSelection, setMuscleGroupSelection] = useState(-1);
  const [equipmentSelection, setEquipmentSelection] = useState<number[]>([]);
  const [equipmentCheckbox, setEquipmentCheckbox] = useState<boolean[]>(
    new Array(equipment.length).fill(false)
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsError(false);

    if (muscleGroupSelection === -1) {
      setIsError(true);
      setErrorText("Please fill in all fields");
      return;
    }

    await axios
      .post(
        `/exercise/add`,
        {
          exerciseName,
          muscleGroupSelection,
          equipmentSelection,
        },
        {
          headers: {
            token: localStorage.token,
          },
        }
      )
      .then((res) => {
        navigate("/exercise/view");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

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

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Exercise name"
          name="exercise-name"
          setState={setExerciseName}
        />
        <p />
        <SelectInput
          label="Muscle group"
          name="muscle-group"
          setState={setMuscleGroupSelection}
          enum={muscleGroup}
        />
        <p />
        <MultiCheckboxInput
          label="Equipment"
          enum={equipment}
          checked={equipmentCheckbox}
          onChange={handleCheckbox}
        />
        <ButtonPrimary value="Add exercise" />
      </form>
    </>
  );
}

export default FormAddExercise;
