import ButtonProps from "./ButtonProps";

function ButtonPrimary(props: ButtonProps) {
  return (
    <button className="w3-button w3-green w3-border w3-hover-teal w3-margin-top">
      {props.value}
    </button>
  );
}

export default ButtonPrimary;
