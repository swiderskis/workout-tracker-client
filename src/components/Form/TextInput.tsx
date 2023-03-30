interface TextInputProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  removeBreak?: boolean;
  password?: boolean;
}

function TextInput(props: TextInputProps) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}: </label>
      {props.removeBreak ? null : <br />}
      <input
        type={props.password ? "password" : "text"}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </>
  );
}

export default TextInput;
