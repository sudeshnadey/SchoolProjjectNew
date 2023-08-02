import React, { createContext, useContext, useEffect, useState } from "react";

// const host = 'http://127.0.0.1:8000/api/';

const Marksheet = createContext();

const MarkContext = ({ children }) => {
  const [allData, setData] = useState([]);
  const [marksheet, setMarksheet] = useState([]);
  const [allclass, setAllClass] = useState([]);
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

  const getData = async ({ selectedClass, selectedMarkSheet }) => {
    try {
      const response = await fetch(
        `https://api.bhattacharjeesolution.in/laravalAPI/schoolnew/api/data?class_id=${selectedClass?.class_id}&session=2022-2023`
      );
      const getAllData = await response.json();
      setData(getAllData);
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
        halfyearly,
        yearly,
        halfYearlyAll,
        yearlyAll,
        changeCount,
        getData,
        getMarksheet,
        getAllClass,
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

export default MarkContext;

export const MarksheetState = () => {
  return useContext(Marksheet);
};
