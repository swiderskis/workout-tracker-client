import { useEffect, useState } from "react";

interface IntegerSelectInputProps {
  index: number;
  maxValue: number;
  onChange: (index: number, value: number) => void;
}

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
      onChange={(e) => props.onChange(props.index, Number(e.target.value))}
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
