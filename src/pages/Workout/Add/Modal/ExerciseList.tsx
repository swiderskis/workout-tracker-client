import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import SelectInput from "../../../../components/Form/SelectInput";
import TextInput from "../../../../components/Form/TextInput";
import muscleGroup from "../../../../enums/muscleGroup";
import useErrorResponse from "../../../../hooks/useErrorResponse";
import { WorkoutExerciseInfo } from "../../../../interfaces/WorkoutExerciseInfo";
import Loading from "../../../Loading";
import ExerciseListRow from "./ExerciseListRow";

interface ExerciseListProps {
  modalError: (error: boolean, errorText: string) => void;
  hideModal: () => void;
  pushExercise: (
    exerciseId: number,
    exerciseName: string,
    muscleGroupId: number,
    exerciseEquipmentLinkId: number,
    equipmentId: number
  ) => { success: boolean; errorMessage: string };
}

function ExerciseList(props: ExerciseListProps) {
  const [loading, setLoading] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState<WorkoutExerciseInfo[]>([]);
  const [search, setSearch] = useState("");
  const [muscleGroupSearch, setMuscleGroupSearch] = useState(-1);

  const loadModalInfo = async () => {
    await axios
      .get(`/workout/exercise-list`, {
        headers: {
          token: localStorage.token,
        },
      })
      .then((res) => {
        setExerciseInfo(res.data);
      })
      .catch((err) => {
        props.modalError(true, useErrorResponse(err));
      });

    setLoading(false);
  };

  // Attempts to push exercise into pushExercise function, closes model if successful & displays error if not
  const attemptPushExercise = (
    exerciseId: number,
    exerciseName: string,
    muscleGroupId: number,
    selectedLinkId: number,
    selectedEquipmentId: number
  ) => {
    const pushExerciseRes = props.pushExercise(
      exerciseId,
      exerciseName,
      muscleGroupId,
      selectedLinkId,
      selectedEquipmentId
    );

    if (!pushExerciseRes.success) {
      props.modalError(true, pushExerciseRes.errorMessage);
      return;
    }

    props.modalError(false, "");
    props.hideModal();
  };

  useEffect(() => {
    loadModalInfo();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <TextInput
        label="Exercise name"
        name="exercise-search"
        value={search}
        onChange={setSearch}
        removeBreak={true}
      />
      <p />
      <SelectInput
        label="Muscle group"
        name="muscle-group"
        value={muscleGroupSearch}
        onChange={setMuscleGroupSearch}
        enum={muscleGroup}
        removeBreak={true}
      />
      <p />
      <table className="w3-table w3-striped w3-centered" id="modal-exercises">
        <thead>
          <tr className="w3-light-grey">
            <td>Exercise name</td>
            <td>Muscle group</td>
            <td>Equipment</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {exerciseInfo.map((exerciseInfo) => (
            <Fragment key={exerciseInfo.exerciseId}>
              {exerciseInfo.exerciseName
                .toLowerCase()
                .includes(search.toLowerCase()) &&
              (muscleGroupSearch === -1 ||
                muscleGroupSearch === exerciseInfo.muscleGroupId) ? (
                <ExerciseListRow
                  exerciseInfo={exerciseInfo}
                  attemptPushExercise={attemptPushExercise}
                />
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ExerciseList;
