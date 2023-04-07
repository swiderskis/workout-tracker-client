import "./style.css";

interface IntegerTextInputProps {
  name: string;
  onChange: (value: number) => void;
  value: number;
}

function IntegerTextInput(props: IntegerTextInputProps) {
  return (
    <>
      <input
        type="number"
        id={props.name}
        name={props.name}
        value={props.value !== 0 ? props.value : ""}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="w3-input w3-border"
        style={{ width: 50, display: "block", margin: "auto" }}
      />
    </>
  );
}

export default IntegerTextInput;
