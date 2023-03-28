import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import DisplayError from "../../../components/DisplayError";
import MultiCheckboxInput from "../../../components/Form/MultiCheckboxInput";
import SelectInput from "../../../components/Form/SelectInput";
import TextInput from "../../../components/Form/TextInput";
import equipment from "../../../enums/equipment";
import muscleGroup from "../../../enums/muscleGroup";
import useErrorResponse from "../../../hooks/useErrorResponse";
import { ExerciseInformation } from "../../../interfaces/ExerciseInformation";

function FormEditExercise(props: ExerciseInformation) {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [exerciseName, setExerciseName] = useState(props.exerciseName);
  const [muscleGroupSelection, setMuscleGroupSelection] = useState(
    props.muscleGroupId
  );
  const [equipmentSelection, setEquipmentSelection] = useState<number[]>(
    props.equipmentIds
  );
  const [equipmentCheckbox, setEquipmentCheckbox] = useState(
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
      .put(
        `/exercise/update/` + props.exerciseId,
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
    const selection = equipmentSelection.slice(0);

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

  useEffect(() => setCheckboxes(), []);

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Exercise name"
          name="exercise-name"
          defaultValue={props.exerciseName}
          setState={setExerciseName}
        />
        <p />
        <SelectInput
          label="Muscle group"
          name="muscle-group"
          setState={setMuscleGroupSelection}
          enum={muscleGroup}
          defaultValue={props.muscleGroupId}
        />
        <p />
        <label>Equipment:</label>
        <br />
        <MultiCheckboxInput
          label="Equipment"
          enum={equipment}
          checked={equipmentCheckbox}
          onChange={handleCheckbox}
        />
        <ButtonPrimary value="Update exercise" />
      </form>
    </>
  );
}

export default FormEditExercise;
