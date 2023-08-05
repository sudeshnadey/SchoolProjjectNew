// src/App.js
import React, { useState } from "react";
import AdmitForm from "./Pages/Admit/admitPage";
import AdmitMarkContext from "./Pages/Admit/context/manage_marks_context";
import ShowByClassMarkContext from "./Pages/ShowMarksheetbyClass/context/manage_marks_context";
import MarksheetbyClassForm from "./Pages/ShowMarksheetbyClass/showMarksheetbyClass";
import MarksheetForm from "./Pages/Marksheet/marksheetPage";
import MarksheetMarkContext from "./Pages/Marksheet/context/manage_marks_context";

// Sample JavaScript files with content
// import file1Content from "./file1";
// import file2Content from "./file2";

const App = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const file1Content = "ok";
  const file2Content = "ok";

  const handleFileChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFile(selectedValue);
  };

  const getFileContent = () => {
    if (selectedFile === "") {
      return "";
    } else if (selectedFile === "1") {
      return (
        <>
          <AdmitMarkContext>
            <AdmitForm />
          </AdmitMarkContext>
        </>
      );
    } else if (selectedFile === "2") {
      return (
        <MarksheetMarkContext>
          <MarksheetForm />
        </MarksheetMarkContext>
      );
    } else if (selectedFile === "3") {
      return (
        <ShowByClassMarkContext>
          <MarksheetbyClassForm />
        </ShowByClassMarkContext>
      );
    } else {
      return "File not found.";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgb(128, 126, 113)",
        height: "100%",
      }}
    >
      <h1>Marksheet</h1>
      <select onChange={handleFileChange} value={selectedFile}>
        <option value="">Marksheet Area</option>
        <option value="1">Admit</option>
        <option value="2">Marksheet</option>
        <option value="3">Show Marksheet By Class </option>
        {/* Add more options for each JavaScript file you want to render */}
      </select>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "30px",
        }}
      >
        <div id="jsFileContainer">
          {/* Display the content of the selected JavaScript file */}
          {getFileContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
