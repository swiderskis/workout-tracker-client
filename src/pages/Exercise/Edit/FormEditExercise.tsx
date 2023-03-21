import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import DisplayError from "../../../components/DisplayError";
import equipment from "../../../enums/equipment";
import muscleGroup from "../../../enums/muscleGroup";
import useErrorResponse from "../../../hooks/useErrorResponse";
import { ExerciseInformation } from "../View/ExerciseInformation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    axios
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

  useEffect(() => setCheckboxes(), []);

  return (
    <>
      {isError ? <DisplayError text={errorText} /> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="exercise-name">Exercise name:</label>
        <br />
        <input
          type="text"
          id="exercise-name"
          name="exercise-name"
          defaultValue={props.exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        ></input>
        <br />
        <br /> <label htmlFor="muscle-group">Muscle group:</label>
        <br />
        <select
          id="muscle-group"
          name="muscle-group"
          defaultValue={props.muscleGroupId}
          onChange={(e) => setMuscleGroupSelection(parseInt(e.target.value))}
        >
          <option></option>
          {muscleGroup.map((muscleGroup) => (
            <option key={muscleGroup.key} value={muscleGroup.key}>
              {muscleGroup.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Equipment:</label>
        <br />
        <ul className="w3-ul" style={{ width: "30%" }}>
          {equipment.map((equipment) => (
            <li key={equipment.key}>
              <input
                type="checkbox"
                id={equipment.value}
                name={equipment.value}
                value={equipment.key}
                checked={equipmentCheckbox[equipment.key]}
                onChange={() => handleCheckbox(equipment.key)}
              />
              <label htmlFor={equipment.value}> {equipment.value}</label>
              <br />
            </li>
          ))}
        </ul>
        <ButtonPrimary value="Update exercise" />
      </form>
    </>
  );
}

export default FormEditExercise;
