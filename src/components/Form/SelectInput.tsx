import { useEffect, useState } from "react";
import { EnumObject } from "../../interfaces/EnumObject";

interface SelectInputProps {
  label: string;
  name: string;
  onChange: (value: number) => void;
  enum: EnumObject[];
  value: number;
  enumFilter?: number[];
  removeLabel?: boolean;
  overrideWidth?: number;
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

    for (let i = 0; i < props.enumFilter.length; i++) {
      currFilteredEnum.push(props.enum[props.enumFilter[i]]);
    }

    setFilteredEnum(currFilteredEnum);
  };

  useEffect(() => filterEnum(), []);

  return (
    <>
      {props.removeLabel ? null : (
        <>
          <label htmlFor={props.name}>{props.label}: </label>
          <br />
        </>
      )}
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="w3-select w3-border"
        style={
          props.overrideWidth ? { width: props.overrideWidth } : { width: 300 }
        }
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
