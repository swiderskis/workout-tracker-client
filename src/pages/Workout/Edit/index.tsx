import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useErrorResponse from "../../../hooks/useErrorResponse";
import { WorkoutRoutine } from "../../../interfaces/WorkoutInformation";
import Loading from "../../Loading";
import DisplayError from "../../../components/DisplayError";
import Routine from "../components/Routine";

function EditRoutine() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [routine, setRoutine] = useState<WorkoutRoutine>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sends updated routine info to database
  const submitAction = async () => {};

  // Loads current routine data from database
  const getRoutine = async () => {
    if (!searchParams.get("routine-id")) navigate("/workout/routine-list");

    await axios
      .get(`/workout/routine/${searchParams.get("routine-id")}`, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        const routineInfo = res.data;

        routineInfo.startDate = new Date(res.data.startDate);
        routineInfo.endDate = new Date(res.data.endDate);

        setRoutine(routineInfo);
      })
      .catch((err) => {
        setIsError(true);
        setErrorText(useErrorResponse(err));
      });

    setLoading(false);
  };

  useEffect(() => {
    getRoutine();
  }, []);

  useEffect(() => console.log(routine), [routine]);

  if (loading) return <Loading />;

  if (isError) return <DisplayError text={errorText} />;

  return <Routine submitAction={submitAction} routine={routine} />;
}

export default EditRoutine;
