import { useState } from "react";
import ButtonSpan from "../../../../components/Button/ButtonSpan";
import SelectInput from "../../../../components/Form/SelectInput";
import equipment from "../../../../enums/equipment";
import muscleGroup from "../../../../enums/muscleGroup";
import useNameFromEnum from "../../../../hooks/useNameFromEnum";
import { WorkoutExerciseInfo } from "../../../../interfaces/WorkoutInformation";
import "../../style.css";

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
  const [equipmentIdSelection, setEquipmentIdSelection] = useState(-1);

  // Sets selected equipment & link ids in when dropdown is changed
  const selectEquipment = (selectedEquipment: number) => {
    const equipmentIds = props.exerciseInfo.equipmentIds;
    const linkIds = props.exerciseInfo.exerciseEquipmentLinkIds;

    const selectedLink = linkIds[equipmentIds.indexOf(selectedEquipment)];

    setLinkIdSelection(selectedLink);
    setEquipmentIdSelection(selectedEquipment);
  };

  return (
    <tr>
      <td>{props.exerciseInfo.exerciseName}</td>
      <td className="mobile-hide-column">
        {useNameFromEnum(props.exerciseInfo.muscleGroupId, muscleGroup)}
      </td>
      <td>
        <SelectInput
          label=""
          name="exercise-equipment"
          onChange={selectEquipment}
          enum={equipment}
          value={equipmentIdSelection}
          enumFilter={props.exerciseInfo.equipmentIds}
          removeLabel={true}
          overrideWidth={100}
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
              equipmentIdSelection
            )
          }
        />
      </td>
    </tr>
  );
}

export default ExerciseListRow;
