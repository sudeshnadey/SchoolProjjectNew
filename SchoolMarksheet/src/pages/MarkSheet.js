import React from "react";
import { useState } from "react";
import OptionBar from "../components/OptionBar";
import ReactDOM from "react-dom";
import ManageMarksheet from "./ManageMarksheet";
import ManageMarksByClass from "./ManageMarksByClass";
import Select from "react-select";

const MarkSheetDropDown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  const renderSelectedOption = () => {
    switch (selectedOption) {
      case "View Marksheet":
        return <ManageMarksheet />;
      case "Show Marksheet By Class":
        return <ManageMarksByClass />;
      // case "Option 3":
      //   return <Option3 />;
      default:
        return null;
    }
  };
  const options = ["View Marksheet", "Show Marksheet By Class", "Option 3"];
  return (
    <div>
      <OptionBar options={options} onSelectOption={handleSelectOption} />
      <div className="content">
        {selectedOption
          ? renderSelectedOption()
          : "Select an option from the bar above."}
      </div>
    </div>
  );
};

export default MarkSheetDropDown;
