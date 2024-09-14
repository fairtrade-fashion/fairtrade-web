import React, { useState } from "react";

interface PriceProgressBarProps {
  initialCurrentValue: number;
  minValue: number;
  maxValue: number;
  onValueChange: (value: number) => void;
}

const PriceProgressBar: React.FC<PriceProgressBarProps> = ({
  initialCurrentValue,
  minValue,
  maxValue,
  onValueChange,
}) => {
  const [currentValue, setCurrentValue] = useState(initialCurrentValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentValue(value);
    onValueChange(value);
  };

  return (
    <div className="flex flex-col">
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={currentValue}
        onChange={handleChange}
        className="w-full bg-gray-800"
      />
      <div className="flex justify-between text-sm">
        <span>₦{minValue}</span>
        <span>₦{currentValue}</span>
        <span>₦{maxValue}</span>
      </div>
    </div>
  );
};

export default PriceProgressBar;
