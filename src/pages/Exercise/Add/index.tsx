import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import useErrorResponse from "../../../hooks/useErrorResponse";
import FormAddEditExercise from "../components/FormAddEditExercise";

function AddExercise() {
  const navigate = useNavigate();

  // Submits new exercise details to database
  const handleSubmit = async (
    exerciseName: string,
    muscleGroupSelection: number,
    equipmentSelection: number[],
    setIsError: (value: React.SetStateAction<boolean>) => void,
    setErrorText: (value: React.SetStateAction<string>) => void
  ) => {
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
      .then((_res) => {
        navigate("/exercise/view");
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });
  };

  const backClick = () => {
    navigate("/exercise/view");
  };

  return (
    <>
      <FormAddEditExercise
        submitButtonValue="Add exercise"
        submitAction={handleSubmit}
      />
      <ButtonSecondary value="Back" onClick={backClick} />
    </>
  );
}

export default AddExercise;
