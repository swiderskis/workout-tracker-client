import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import DisplayError from "../../../components/DisplayError";
import useErrorResponse from "../../../hooks/useErrorResponse";
import Loading from "../../Loading";
import { ExerciseInformation } from "../../../interfaces/ExerciseInformation";
import FormAddEditExercise from "../components/FormAddEditExercise";

function EditExercise() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInformation>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loadExerciseInfo = async () => {
    if (!searchParams.get("exercise-id")) navigate("/exercise/view");

    await axios
      .get(`/exercise/view/` + searchParams.get("exercise-id"), {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        setExerciseInfo(res.data);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });

    setLoading(false);
  };

  const handleSubmit = async (
    exerciseName: string,
    muscleGroupSelection: number,
    equipmentSelection: number[],
    setIsError: (value: React.SetStateAction<boolean>) => void,
    setErrorText: (value: React.SetStateAction<string>) => void,
    exerciseId: number
  ) => {
    if (muscleGroupSelection === -1) {
      setIsError(true);
      setErrorText("Please fill in all fields");
      return;
    }

    await axios
      .put(
        `/exercise/update/` + exerciseId,
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

  const backClick = () => {
    navigate("/exercise/view");
  };

  useEffect(() => {
    loadExerciseInfo();
  }, []);

  if (loading) return <Loading />;

  if (isError) return <DisplayError text={errorText} />;

  return (
    <>
      <h3>Editing exercise: {exerciseInfo?.exerciseName}</h3>
      <FormAddEditExercise
        submitButtonValue="Update exercise"
        submitAction={handleSubmit}
        exerciseInfo={exerciseInfo as ExerciseInformation}
      />
      <ButtonSecondary value="Back" onClick={backClick} />
    </>
  );
}

export default EditExercise;
