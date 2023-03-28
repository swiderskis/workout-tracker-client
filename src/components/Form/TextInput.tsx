interface TextInputProps {
  label: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
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
        defaultValue={props.defaultValue}
        onChange={(e) => props.setState(e.target.value)}
      />
    </>
  );
}

export default TextInput;
