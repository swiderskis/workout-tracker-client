import { LegacyRef, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickProps {
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

function DatePick(props: DatePickProps) {
  const DatePickButton = forwardRef(
    (
      props: { value: string; onClick: () => void },
      ref: LegacyRef<HTMLButtonElement>
    ) => (
      <button
        className="w3-button w3-white w3-border w3-hover-light-grey w3-ripple"
        onClick={props.onClick}
        ref={ref}
      >
        {props.value}
      </button>
    )
  );

  return (
    <DatePicker
      dateFormat={"dd/MM/yyyy"}
      selected={props.startDate}
      onChange={(dates) => {
        const [start, end] = dates as [Date, Date];
        props.onChange(start, end);
      }}
      customInput={
        <DatePickButton value={`${props.startDate}`} onClick={() => {}} />
      }
      startDate={props.startDate}
      endDate={props.endDate}
      selectsRange={true}
    />
  );
}

export default DatePick;
