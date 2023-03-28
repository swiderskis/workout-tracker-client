import { EnumObject } from "../../interfaces/EnumObject";

interface SelectInputProps {
  label: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<number>>;
  enum: EnumObject[];
  defaultValue?: number;
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
        onChange={(e) => props.setState(Number(e.target.value))}
        defaultValue={props.defaultValue}
      >
        <option key={-1} value={-1}></option>
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
