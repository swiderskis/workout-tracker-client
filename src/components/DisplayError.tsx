interface DisplayErrorProps {
  text: string;
}

function DisplayError(props: DisplayErrorProps) {
  return (
    <div className="w3-container w3-pale-red w3-padding-16">{props.text}</div>
  );
}

export default DisplayError;
