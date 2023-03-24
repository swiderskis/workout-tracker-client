import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonSecondary from "../../../components/Button/ButtonSecondary";
import DisplayError from "../../../components/DisplayError";
import useErrorResponse from "../../../hooks/useErrorResponse";
import Loading from "../../Loading";
import { ExerciseInformation } from "../View/ExerciseInformation";
import FormEditExercise from "./FormEditExercise";

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

      <FormEditExercise {...(exerciseInfo as ExerciseInformation)} />
      <ButtonSecondary value="Back" onClick={backClick} />
    </>
  );
}

export default EditExercise;
