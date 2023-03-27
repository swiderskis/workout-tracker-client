import React, { useState } from "react";
import DisplayError from "../../../components/DisplayError";
import muscleGroup from "../../../enums/muscleGroup";
import equipment from "../../../enums/equipment";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useErrorResponse from "../../../hooks/useErrorResponse";

function FormAddExercise() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [muscleGroupSelection, setMuscleGroupSelection] = useState(-1);
  const [equipmentSelection, setEquipmentSelection] = useState<number[]>([]);
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
        <label htmlFor="exercise-name">Exercise name:</label>
        <br />
        <input
          type="text"
          id="exercise-name"
          name="exercise-name"
          onChange={(e) => setExerciseName(e.target.value)}
        ></input>
        <p />
        <label htmlFor="muscle-group">Muscle group:</label>
        <br />
        <select
          id="muscle-group"
          name="muscle-group"
          onChange={(e) => setMuscleGroupSelection(Number(e.target.value))}
        >
          <option key={-1} value={-1}></option>
          {muscleGroup.map((muscleGroup) => (
            <option key={muscleGroup.key} value={muscleGroup.key}>
              {muscleGroup.value}
            </option>
          ))}
        </select>
        <p />
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
        <ButtonPrimary value="Add exercise" />
      </form>
    </>
  );
}

export default FormAddExercise;
