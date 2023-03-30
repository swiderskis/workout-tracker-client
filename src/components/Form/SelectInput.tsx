import { useEffect, useState } from "react";
import { EnumObject } from "../../interfaces/EnumObject";

interface SelectInputProps {
  label: string;
  name: string;
  onChange: (value: number) => void;
  enum: EnumObject[];
  value: number;
  enumFilter?: number[];
  removeBreak?: boolean;
  removeLabel?: boolean;
}

// Filters enum if only certain enum values are wanted
function SelectInput(props: SelectInputProps) {
  const [filteredEnum, setFilteredEnum] = useState<EnumObject[]>([]);

  const filterEnum = () => {
    if (!props.enumFilter) {
      setFilteredEnum(props.enum);
      return;
    }

    const currFilteredEnum: EnumObject[] = [];

    props.enum.forEach((element) =>
      props.enumFilter?.includes(element.key)
        ? currFilteredEnum.push(element)
        : null
    );

    setFilteredEnum(currFilteredEnum);
  };

  useEffect(() => filterEnum(), []);

  return (
    <>
      {props.removeLabel ? null : (
        <label htmlFor={props.name}>{props.label}: </label>
      )}
      {props.removeBreak || props.removeLabel ? null : <br />}
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
      >
        <option key={-1} value={-1} />
        {filteredEnum.map((element) => (
          <option key={element.key} value={element.key}>
            {element.value}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectInput;
