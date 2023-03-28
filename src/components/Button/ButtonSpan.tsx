import ButtonProps from "./ButtonProps";

function ButtonSpan(props: ButtonProps) {
  const clickAction = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <span
      style={{ textDecoration: "underline", cursor: "pointer" }}
      onClick={clickAction}
    >
      {props.value}
    </span>
  );
}

export default ButtonSpan;
