interface TextInputProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  password?: boolean;
}

function TextInput(props: TextInputProps) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}: </label>
      <br />
      <input
        type={props.password ? "password" : "text"}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w3-input w3-border"
        style={{ width: 300 }}
      />
    </>
  );
}

export default TextInput;
