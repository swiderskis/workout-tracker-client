import ButtonProps from "./ButtonProps";

function ButtonSecondary(props: ButtonProps) {
  return (
    <button className="w3-button w3-white w3-border w3-hover-light-grey w3-margin-top w3-ripple">
      {props.value}
    </button>
  );
}

export default ButtonSecondary;
