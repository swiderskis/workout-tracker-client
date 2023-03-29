import useNameFromEnum from "../../../../hooks/useNameFromEnum";
import equipment from "../../../../enums/equipment";

interface EquipmentSelectInputProps {
  linkIds: number[];
  equipmentIds: number[];
  selectEquipment: (
    linkIds: number[],
    equipmentIds: number[],
    selectedLink: number
  ) => void;
}

function EquipmentSelectInput(props: EquipmentSelectInputProps) {
  return (
    <select
      id="exercise-equipment"
      name="exercise-equipment"
      onChange={(e) => {
        props.selectEquipment(
          props.linkIds,
          props.equipmentIds,
          Number(e.target.value)
        );
      }}
    >
      <option key={-1} value={-1}></option>
      {props.equipmentIds.map((equipmentId, equipmentIndex) => (
        <option
          key={props.linkIds[equipmentIndex]}
          value={props.linkIds[equipmentIndex]}
        >
          {useNameFromEnum(equipmentId, equipment)}
        </option>
      ))}
    </select>
  );
}

export default EquipmentSelectInput;
