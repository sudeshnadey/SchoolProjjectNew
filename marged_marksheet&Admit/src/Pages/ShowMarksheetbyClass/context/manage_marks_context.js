import React, { createContext, useContext, useEffect, useState } from "react";

// const host = 'http://127.0.0.1:8000/api/';

const Marksheet = createContext();

const ShowByClassMarkContext = ({ children }) => {
  const [allData, setData] = useState([]);
  const [setUpdateData, setSetUpdateData] = useState([]);
  const [marksheet, setMarksheet] = useState([]);
  const [showSection_name, setShowSection_name] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [allclass, setAllClass] = useState([]);
  const [viewMarksheet, setviewMarksheet] = useState([]);
  const [halfyearly, setHalfYearly] = useState([]);

  const [halfYearlyAll, setHalfYearlyAll] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [yearlyAll, setYearlyAll] = useState([]);
  const [changeCount, setChangeCount] = useState(1);

  useEffect(() => {
    // getData('');

    // getMarksheet('');
    getAllClass("");
    // getHalfYearly("");
    // getYearly();
  }, [changeCount]);
  // useEffect(() => {
  //   console.log(allData);
  // },[allData]);

  const getData = async ({
    selectedClass,
    selectedMarkSheet,
    subject_Name,
    subject_SubField,
  }) => {
    try {
      const updatedValue =
        selectedMarkSheet?.marksheet_name === "2022-23"
          ? "2022-2023"
          : "2023-2024";

      let formData = new FormData();
      formData.append("session", updatedValue);
      formData.append("class_id", selectedClass?.class_id);
      formData.append("examName", subject_SubField?.subjectSubField_id);
      formData.append("subject_id", subject_Name["subject_id "]);

      const response = await fetch(
        "https://api.bhattacharjeesolution.in/laravalAPI/schoolnew2/allstudentWithOnemark.php",
        {
          method: "POST",
          body: formData,
          // headers: {
          //   'Content-Type': 'application/json'
          // },
        }
      );
      const getAllData = await response.json();
      setData(getAllData);
      console.log(getAllData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getUpdate = async ({ id, number, subjectSubField }) => {
    // console.log(id)
    // console.log(number)
    // console.log(subjectSubField)

    try {
      let formData = new FormData();
      formData.append("marksheet_student_id", id);
      formData.append("examNumber", number);
      formData.append("examName", subjectSubField);

      const response = await fetch(
        "https://api.bhattacharjeesolution.in/laravalAPI/schoolnew2/marksheet-update.php",
        {
          method: "POST",
          body: formData,
          // headers: {
          //   'Content-Type': 'application/json'
          // },
        }
      );
      const getAllData = await response.json();
      setUpdateData(getAllData);
      console.log(getAllData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getMarksheet = async ({ selectedClass }) => {
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/marksheet?class_id=${selectedClass?.class_id}`
      );
      const yearNameData = await response.json();
      setMarksheet(yearNameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getSubject = async ({ selectedClass }) => {
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew2/subject_show.php?classId=${selectedClass?.class_id}`
      );
      const subjectNames = await response.json();
      setSubjectName(subjectNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllClass = async () => {
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/class`
      );
      const classNameData = await response.json();
      setAllClass(classNameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getShowSection = async ({ selectedClass }) => {
    // console.log(selectedClass);
    // console.log(selectedMarkSheet);
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/sectionName?class_id=${selectedClass?.class_id}`
      );
      const getSection_name = await response.json();
      setShowSection_name(getSection_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getViewMarksheet = async (props) => {
    // console.log(props.subject_SubField);

    try {
      const response = await fetch(
        // `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/HalfYearly?student_id=${props?.student_id}`
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew2/viewMarksheet.php?studentId=${props?.studentId}&classId=${props?.classId}&marksheetId=${props?.marksheetId}&exam_name=${props?.subjectSubField}`
      );
      const marksheetData = await response.json();
      setviewMarksheet(marksheetData);
      // console.log(marksheetData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getHalfYearly = async (props) => {
    // console.log(props.marksheet_student_id);
    // console.log(props.HalfYearly);
    // console.log(props.Yearly);
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/HalfYearly?student_id=${props?.student_id}`
      );
      const halfYearlyData = await response.json();
      setHalfYearly(halfYearlyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getYearly = async () => {
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/Yearly?Yearly=62&marksheet_student_id=8943`
      );
      const yearlyData = await response.json();
      setYearly(yearlyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getHalfYearlyAll = async ({ selectedClass, selectedMarkSheet }) => {
    try {
      const response = await fetch(``);
      const getHalfYearlyAllData = await response.json();
      console.log(getHalfYearlyAllData);
      setHalfYearlyAll(getHalfYearlyAllData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getYearlyAll = async ({ selectedClass, selectedMarkSheet }) => {
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/Yearlyall?class_id=${selectedClass?.class_id}&marksheet_id=${selectedMarkSheet?.marksheet_id}`
      );
      const getYearlyAllData = await response.json();
      console.log(getYearlyAllData);
      setYearlyAll(getYearlyAllData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Marksheet.Provider
      value={{
        allData,
        marksheet,
        allclass,
        showSection_name,
        subjectName,
        viewMarksheet,
        halfyearly,
        yearly,
        halfYearlyAll,
        yearlyAll,
        changeCount,
        getData,
        getMarksheet,
        getAllClass,
        getShowSection,
        getSubject,
        getUpdate,
        getViewMarksheet,
        getHalfYearly,
        getYearly,
        getHalfYearlyAll,
        getYearlyAll,
      }}
    >
      {children}
    </Marksheet.Provider>
  );
};

export default ShowByClassMarkContext;

export const MarksheetState = () => {
  return useContext(Marksheet);
};
