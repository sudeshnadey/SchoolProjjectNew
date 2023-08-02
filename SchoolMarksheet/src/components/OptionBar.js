import React from "react";

const OptionBar = ({ options, onSelectOption }) => {
  return (
    <div className="option-bar">
      {options.map((option) => (
        <button key={option} onClick={() => onSelectOption(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionBar;
