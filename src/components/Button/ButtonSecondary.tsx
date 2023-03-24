import ButtonProps from "./ButtonProps";

function ButtonSecondary(props: ButtonProps) {
  const clickAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) {
      e.preventDefault();

      props.onClick();
    }
  };

  return (
    <button
      className="w3-button w3-white w3-border w3-hover-light-grey w3-margin-top w3-ripple"
      onClick={clickAction}
    >
      {props.value}
    </button>
  );
}

export default ButtonSecondary;
