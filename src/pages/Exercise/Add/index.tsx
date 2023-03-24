import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import FormAddExercise from "./FormAddExercise";

function AddExercise() {
  const navigate = useNavigate();

  const backClick = () => {
    navigate("/exercise/view");
  };

  return (
    <>
      <FormAddExercise />
      <ButtonSecondary value="Back" onClick={backClick} />
    </>
  );
}

export default AddExercise;
