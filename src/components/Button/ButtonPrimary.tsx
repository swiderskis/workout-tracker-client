import ButtonProps from "./ButtonProps";

function ButtonPrimary(props: ButtonProps) {
  const clickAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.handleClick) {
      e.preventDefault();

      props.handleClick();
    }
  };

  return (
    <button
      className="w3-button w3-green w3-border w3-hover-teal w3-margin-top w3-ripple"
      onClick={clickAction}
    >
      {props.value}
    </button>
  );
}

export default ButtonPrimary;
