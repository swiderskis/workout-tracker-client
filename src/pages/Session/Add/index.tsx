import axios from "axios";
import { SessionDetails } from "../../../interfaces/SessionInformation";
import Session from "../components/Session";
import { SubmitParameters } from "../contexts/SubmitParameters";
import { useNavigate } from "react-router-dom";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import equipment from "../../../enums/equipment";

function AddSession() {
  const navigate = useNavigate();

  const handleSubmit = async (session: SessionDetails) => {
    let blankFields = false;

    session.exercises.forEach((exercise) => {
      exercise.weight.forEach((weight) => {
        if (weight === 0) {
          blankFields = true;
        }
      });
    });

    if (blankFields)
      return {
        isError: true,
        errorText: "Please input weights for all sets",
      };

    session.exercises.forEach((exercise, index) => {
      session.exercises[index].exerciseName = `${useNameFromEnum(
        exercise.equipmentId,
        equipment
      )} ${exercise.exerciseName}`;
    });

    await axios
      .post(`/session/log`, session, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((_res) => navigate("/"))
      .catch((err) => {});

    return { isError: false, errorText: "" };
  };

  return (
    <SubmitParameters.Provider
      value={{ value: "Log session", onSubmit: handleSubmit }}
    >
      <Session />
    </SubmitParameters.Provider>
  );
}

export default AddSession;
