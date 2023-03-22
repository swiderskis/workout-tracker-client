import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DisplayError from "../../../components/DisplayError";
import useErrorResponse from "../../../hooks/useErrorResponse";
import Loading from "../../Loading";

function DeleteExercise() {
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const deleteExercise = async () => {
    if (!searchParams.get("exercise-id")) navigate("/exercise/view");

    await axios
      .delete(`/exercise/delete/` + searchParams.get("exercise-id"), {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        navigate("/exercise/view");
      })
      .catch((err) => {
        setErrorText(useErrorResponse(err));
        setLoading(false);
      });
  };

  useEffect(() => {
    deleteExercise();
  }, []);

  if (loading) return <Loading />;

  return <DisplayError text={errorText} />;
}

export default DeleteExercise;
