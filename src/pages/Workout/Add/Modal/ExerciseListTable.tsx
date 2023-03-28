import axios from "axios";
import { useEffect, useState } from "react";
import ButtonSpan from "../../../../components/Button/ButtonSpan";
import equipment from "../../../../enums/equipment";
import muscleGroup from "../../../../enums/muscleGroup";
import useErrorResponse from "../../../../hooks/useErrorResponse";
import useNameFromEnum from "../../../../hooks/useNameFromEnum";
import { WorkoutExerciseInfo } from "../../../../interfaces/WorkoutExerciseInfo";
import Loading from "../../../Loading";
import EquipmentSelectInput from "./EquipmentSelectInput";

interface ExerciseListTableProps {
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

function ExerciseListTable(props: ExerciseListTableProps) {
  const [loading, setLoading] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState<WorkoutExerciseInfo[]>([]);
  const [selectedLinkIds, setSelectedLinkIds] = useState<number[]>([]);
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<number[]>(
    []
  );

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

  // Updates selectedLinkIds and selectedEquipmentIds element when equipment is selected for an exercise
  const selectEquipment = (
    linkIds: number[],
    equipmentIds: number[],
    selectedLink: number,
    index: number
  ) => {
    const selectedEquipment = equipmentIds[linkIds.indexOf(selectedLink)];

    let currLinkIds = selectedLinkIds.slice(0);
    let currEquipmentIds = selectedEquipmentIds.slice(0);

    if (selectedLink === -1) {
      currLinkIds[index] = -1;
      currEquipmentIds[index] = -1;
    } else {
      currLinkIds[index] = selectedLink;
      currEquipmentIds[index] = selectedEquipment;
    }

    setSelectedLinkIds(currLinkIds);
    setSelectedEquipmentIds(currEquipmentIds);
  };

  useEffect(() => {
    loadModalInfo();
  }, []);

  // Initialises selectedLinkIds and selectedEquipmentIds with -1 when exercise list is loaded
  useEffect(() => {
    const linkIds: number[] = [];
    const equipmentIds: number[] = [];
    exerciseInfo.forEach(() => {
      linkIds.push(-1);
      equipmentIds.push(-1);
    });
    setSelectedLinkIds(linkIds);
    setSelectedEquipmentIds(equipmentIds);
  }, [exerciseInfo]);

  if (loading) return <Loading />;

  return (
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
        {exerciseInfo.map((exerciseInfo, index) => (
          <tr key={exerciseInfo.exerciseId}>
            <td>{exerciseInfo.exerciseName}</td>
            <td>{useNameFromEnum(exerciseInfo.muscleGroupId, muscleGroup)}</td>
            <td>
              <EquipmentSelectInput
                linkIds={exerciseInfo.exerciseEquipmentLinkIds}
                equipmentIds={exerciseInfo.equipmentIds}
                index={index}
                selectEquipment={selectEquipment}
              />
            </td>
            <td>
              <ButtonSpan
                value="Select"
                onClick={() =>
                  attemptPushExercise(
                    exerciseInfo.exerciseId,
                    exerciseInfo.exerciseName,
                    exerciseInfo.muscleGroupId,
                    selectedLinkIds[index],
                    selectedEquipmentIds[index]
                  )
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseListTable;
