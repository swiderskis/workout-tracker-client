import { useEffect, useState } from "react";

interface IntegerSelectInputProps {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
}

// Creates array from 1 to maxValue
function IntegerSelectInput(props: IntegerSelectInputProps) {
  const [numberArray, setNumberArray] = useState<number[]>([]);

  const generateArray = () => {
    const currArray = [];
    for (let i = 0; i < props.maxValue; i++) {
      currArray.push(i + 1);
    }

    setNumberArray(currArray);
  };

  useEffect(() => generateArray(), []);

  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
      className="w3-select w3-border"
      style={{ width: 50 }}
    >
      <option key={-1} value={-1} />
      {numberArray.map((element) => (
        <option key={element} value={element}>
          {element}
        </option>
      ))}
    </select>
  );
}

export default IntegerSelectInput;
