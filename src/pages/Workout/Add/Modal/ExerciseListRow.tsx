import { useState } from "react";
import ButtonSpan from "../../../../components/Button/ButtonSpan";
import muscleGroup from "../../../../enums/muscleGroup";
import useNameFromEnum from "../../../../hooks/useNameFromEnum";
import { WorkoutExerciseInfo } from "../../../../interfaces/WorkoutExerciseInfo";
import EquipmentSelectInput from "./EquipmentSelectInput";

interface ExerciseListRowProps {
  exerciseInfo: WorkoutExerciseInfo;
  attemptPushExercise: (
    exerciseId: number,
    exerciseName: string,
    muscleGroupId: number,
    selectedLinkId: number,
    selectedEquipmentId: number
  ) => void;
}

function ExerciseListRow(props: ExerciseListRowProps) {
  const [linkIdSelection, setLinkIdSelection] = useState(-1);
  const [exerciseIdSelection, setExerciseIdSelection] = useState(-1);

  const selectEquipment = (
    linkIds: number[],
    equipmentIds: number[],
    selectedLink: number
  ) => {
    const selectedEquipment = equipmentIds[linkIds.indexOf(selectedLink)];

    setLinkIdSelection(selectedLink);
    setExerciseIdSelection(selectedEquipment);
  };

  return (
    <tr>
      <td>{props.exerciseInfo.exerciseName}</td>
      <td>{useNameFromEnum(props.exerciseInfo.muscleGroupId, muscleGroup)}</td>
      <td>
        <EquipmentSelectInput
          linkIds={props.exerciseInfo.exerciseEquipmentLinkIds}
          equipmentIds={props.exerciseInfo.equipmentIds}
          selectEquipment={selectEquipment}
        />
      </td>
      <td>
        <ButtonSpan
          value="Select"
          onClick={() =>
            props.attemptPushExercise(
              props.exerciseInfo.exerciseId,
              props.exerciseInfo.exerciseName,
              props.exerciseInfo.muscleGroupId,
              linkIdSelection,
              exerciseIdSelection
            )
          }
        />
      </td>
    </tr>
  );
}

export default ExerciseListRow;
