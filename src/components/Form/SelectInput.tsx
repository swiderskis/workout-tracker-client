import { EnumObject } from "../../interfaces/EnumObject";

interface SelectInputProps {
  label: string;
  name: string;
  onChange: (value: number) => void;
  enum: EnumObject[];
  value: number;
  removeBreak?: boolean;
}

function SelectInput(props: SelectInputProps) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}: </label>
      {props.removeBreak ? null : <br />}
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
      >
        <option key={-1} value={-1} />
        {props.enum.map((element) => (
          <option key={element.key} value={element.key}>
            {element.value}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectInput;
