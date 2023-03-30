import { EnumObject } from "../../interfaces/EnumObject";

interface MultiCheckboxInputProps {
  label: string;
  enum: EnumObject[];
  checked: boolean[];
  onChange: (key: number) => void;
}

function MultiCheckboxInput(props: MultiCheckboxInputProps) {
  return (
    <>
      <label>{props.label}:</label>
      <br />
      <ul className="w3-ul" style={{ width: 300 }}>
        {props.enum.map((element) => (
          <li key={element.key}>
            <input
              type="checkbox"
              id={element.value}
              name={element.value}
              value={element.key}
              checked={props.checked[element.key]}
              onChange={() => props.onChange(element.key)}
              className="w3-check"
            />
            <label htmlFor={element.value}> {element.value}</label>
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default MultiCheckboxInput;
