import React from "react";
import classes from "./MarksheetTable.module.css";

const MarksheetTable = ({ viewMarksheet, studentInfo, examName, examYear }) => {
  const results = viewMarksheet?.data || [];
  // console.log(results.length > 0 && results[0].subject_name);
  const calculateTotalMarks = (results) => {
    let totalYrlyMarks = 0;
    let totalHalfYearlyMarks = 0;
    let totalObtainedTerm1 = 0;
    let totalObtainedTerm2 = 0;

    results.forEach((item) => {
      totalYrlyMarks += parseInt(item.yrly) || 0;
      totalHalfYearlyMarks += parseInt(item.h_yrly) || 0;
      totalObtainedTerm1 += parseInt(item.Marks_Obtained_pt1) || 0;
      totalObtainedTerm2 += parseInt(item.Marks_Obtained_pt2) || 0;
    });

    return {
      totalYrlyMarks,
      totalObtainedTerm2,
      totalHalfYearlyMarks,
      totalObtainedTerm1,
    };
  };

  const {
    totalYrlyMarks,
    totalHalfYearlyMarks,
    totalObtainedTerm2,
    totalObtainedTerm1,
  } = calculateTotalMarks(results);
  const total = totalHalfYearlyMarks + totalYrlyMarks;
  const percent =
    examName === "PT(Term-1)" ||
    examName === "Note Book(Term-1)" ||
    examName === "Subject Enrichment(Term-1)" ||
    examName === "Half Yearly(Term-1)"
      ? ((total / 600) * 100).toFixed(2)
      : ((total / 1200) * 100).toFixed(2);

  function getGrade(marks) {
    if (marks >= 91 && marks <= 100) {
      return "A1";
    } else if (marks >= 81 && marks <= 90) {
      return "A2";
    } else if (marks >= 71 && marks <= 80) {
      return "B1";
    } else if (marks >= 61 && marks <= 70) {
      return "B2";
    } else if (marks >= 51 && marks <= 60) {
      return "C1";
    } else if (marks >= 41 && marks <= 50) {
      return "C2";
    } else if (marks >= 33 && marks <= 40) {
      return "D";
    } else if (marks <= 32) {
      return "E";
    } else {
      return "Invalid marks";
    }
  }

  // const oneData =results.filter(function(item) {
  //     return item.subject_name === "HINDI";
  //   }) || [];

  // console.log(oneData.subject_name);

  return (
    <div className={classes.marksheet}>
      {/* {viewMarksheet?.data?.map((item) => ( */}
      <div className={classes.head}>
        <h1 className={classes.heading}>
          {examName} Report Card {examYear}{" "}
        </h1>
        <div className={classes.studentInfo}>
          <table>
            {studentInfo?.data?.map((item) => (
              <tbody>
                <tr>
                  <td className={classes.headtd}>
                    <b>Name : </b>
                    {item.student_name}
                  </td>
                  <td className={classes.headtd}>
                    <b>Class :</b> {item.class}
                  </td>
                  <td className={classes.headtd}>
                    <b>Section :</b> {item.section}
                  </td>
                </tr>

                <tr>
                  <td className={classes.headtd}>
                    <b>Father's Name : </b>
                    {item.father_name}
                  </td>
                  <td className={classes.headtd}>
                    <b>Registration No. :</b> 220006
                  </td>
                  <td className={classes.headtd}></td>
                </tr>
                <tr>
                  <td className={classes.headtd}>
                    <b>Date of Birth :</b> {item.dob}
                  </td>
                  <td className={classes.headtd}>
                    <b>Roll No. :</b> {item.rollno}
                  </td>
                  <td className={classes.headtd}></td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className={classes.table}>
          <table>
            <tbody>
              <tr>
                {/* <th colspan="">Scholastic Areas</th>
                <th colspan="6">Term - 1 (100 marks)</th> */}
                {/* <th colspan="6">Term - 2 (100 marks)</th> */}
              </tr>
              {/* <tr>
                {oneData.subject_name && <th>Subject Name</th>}
                {oneData.obtain_mark && <th>Per Test(10)</th>}
                {oneData.obtain_mark_sa && <th>Note Books(5)</th>}
                {oneData.subject_enrichmenth && <th>Subject Enrichment(5)</th>}
                {oneData.h_yrly && <th>Half Yearly Exams(80)</th>}
                {oneData.Marks_Obtained_pt1 && <th>Marks Obtained(100)</th>}
                {oneData.Marks_Obtained_pt1 && <th>GR</th>}
                {oneData.obtain_mark_pt_2 && <th>Per Test(10)</th>}
                {oneData.obtain_mark_sa_2 && <th>Note Books(5)</th>}
                {oneData.subject_enrichmentf && <th>Subject Enrichment(5)</th>}
                {oneData.yrly && <th>Yearly Exams(80)</th>}
                {oneData.Marks_Obtained_pt2 && <th>Marks Obtained(100)</th>}
                {oneData.Marks_Obtained_pt2 && <th>GR</th>}
              </tr> */}
              {examName === "PT(Term-1)" ||
              examName === "Note Book(Term-1)" ||
              examName === "Subject Enrichment(Term-1)" ||
              examName === "Half Yearly(Term-1)" ? (
                <>
                  <tr>
                    <th colspan="">Scholastic Areas</th>
                    <th colspan="6">Term - 1 (100 marks)</th>
                    {/* <th colspan="6">Term - 2 (100 marks)</th> */}
                  </tr>
                  <tr>
                    <th>Subject </th>
                    <th>Per Test(10)</th>
                    <th>Note Books(5)</th>
                    <th>Subject Enrichment(5)</th>
                    <th>Half Yearly Exams(80)</th>
                    <th>Marks Obtained(100)</th>
                    <th>GR</th>
                  </tr>
                </>
              ) : examName === "PT(Term-2)" ||
                examName === "Note Book(Term-2)" ||
                examName === "Subject Enrichment(Term-2)" ? (
                <>
                  <tr>
                    <th colspan="">Scholastic Areas</th>
                    <th colspan="6">Term - 2 (100 marks)</th>
                  </tr>
                  <tr>
                    <th>Subject </th>
                    <th>Per Test(10)</th>
                    <th>Note Books(5)</th>
                    <th>Subject Enrichment(5)</th>
                    <th>Yearly Exams(80)</th>
                    <th>Marks Obtained(100)</th>
                    <th>GR</th>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <th colspan="">Scholastic Areas</th>
                    <th colspan="6">Term - 1 (100 marks)</th>
                    <th colspan="6">Term - 2 (100 marks)</th>
                  </tr>
                  <tr>
                    <th>Subject </th>
                    <th>Per Test(10)</th>
                    <th>Note Books(5)</th>
                    <th>Subject Enrichment(5)</th>
                    <th>Half Yearly Exams(80)</th>
                    <th>Marks Obtained(100)</th>
                    <th>GR</th>
                    <th>Per Test(10)</th>
                    <th>Note Books(5)</th>
                    <th>Subject Enrichment(5)</th>
                    <th>Yearly Exams(80)</th>
                    <th>Marks Obtained(100)</th>
                    <th>GR</th>
                  </tr>
                </>
              )}
              {results?.map((item, index) => (
                <tr key={index}>
                  {item.subject_name && <td>{item.subject_name}</td>}
                  {item.obtain_mark && <td>{item.obtain_mark}</td>}
                  {item.obtain_mark_sa && <td>{item.obtain_mark_sa}</td>}
                  {item.subject_enrichmenth && (
                    <td>{item.subject_enrichmenth}</td>
                  )}
                  {item.h_yrly && <td>{item.h_yrly}</td>}
                  {item.Marks_Obtained_pt1 && (
                    <td>{item.Marks_Obtained_pt1}</td>
                  )}
                  {item.Marks_Obtained_pt1 && (
                    <td>{getGrade(item.Marks_Obtained_pt1)}</td>
                  )}
                  {item.obtain_mark_pt_2 && <td>{item.obtain_mark_pt_2}</td>}
                  {item.obtain_mark_sa_2 && <td>{item.obtain_mark_sa_2}</td>}
                  {item.subject_enrichmentf && (
                    <td>{item.subject_enrichmentf}</td>
                  )}
                  {item.yrly && <td>{item.yrly}</td>}
                  {item.Marks_Obtained_pt2 && (
                    <td>{item.Marks_Obtained_pt2}</td>
                  )}
                  {item.Marks_Obtained_pt2 && (
                    <td>{getGrade(item.Marks_Obtained_pt2)}</td>
                  )}
                </tr>
              ))}
              <tr>
                {examName === "PT(Term-1)" ||
                examName === "Note Book(Term-1)" ||
                examName === "Subject Enrichment(Term-1)" ||
                examName === "Half Yearly(Term-1)" ? (
                  <>
                    <td></td>
                    <td>Term 1:-</td>
                    <td></td>
                    <td></td>
                    <td>{totalHalfYearlyMarks}</td>
                    <td>600</td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td>Term 1:-</td>
                    <td></td>
                    <td></td>
                    <td>{totalHalfYearlyMarks}</td>
                    <td>{totalObtainedTerm1}</td>
                    <td></td>
                    <td>Term 2:-</td>
                    <td></td>
                    <td></td>
                    <td>{totalYrlyMarks}</td>
                    <td>{totalObtainedTerm2}</td>
                    <td></td>
                  </>
                )}
              </tr>
              <tr>
                <td>Total</td>
                <td>1200</td>
                <td>{total}</td>
                <td>Percentage</td>
                <td>{percent} %</td>
                <td>Overall Grade :- {percent > 20 && getGrade(percent)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>
                  Co-Scholastic Areas: Term-1 [on a 3-point (A-C) grading scale]
                </th>
                <th>Grade</th>
                <th>
                  Co-Scholastic Areas: Term-2 [on a 3-point (A-C) grading scale]
                </th>
                <th>Grade</th>
              </tr>
              <tr>
                <th>Work Education [or Pre-vocational Education]</th>
                <th>
                  <input type="text" value="" />
                </th>
                <th>Work Education [or Pre-vocational Education]</th>
                <th>
                  <input type="text" value="" />
                </th>
              </tr>
              <tr>
                <th>Art Education</th>
                <th>
                  <input type="text" value="" />
                </th>
                <th>Art Education</th>
                <th>
                  <input type="text" value="" />
                </th>
              </tr>
              <tr>
                <th>Health &amp; Physical Education</th>
                <th>
                  <input type="text" />
                </th>
                <th>Health &amp; Physical Education</th>
                <th>
                  <input type="text" />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>
                  Co-Scholastic Areas: Term-1 [on a 3-point (A-C) grading scale]
                </th>
                <th>Grade</th>
                <th>
                  Co-Scholastic Areas: Term-2 [on a 3-point (A-C) grading scale]
                </th>
                <th>Grade</th>
              </tr>
              <tr>
                <th>Discipline: Term-1 [on a 3-point (A-C) grading scale]</th>
                <td>
                  <input type="text" value="" />
                </td>
                <th>Discipline: Term-2 [on a 3-point (A-C) grading scale]</th>
                <td>
                  <input type="text" value="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th colspan="">Class Teacher's Remark</th>
                <th colspan="6">Attendance_________________</th>
              </tr>
              <tr>
                <td>Promoted to Class ...............................</td>
              </tr>
              <tr>
                <h4>Place</h4>
              </tr>
              <tr>
                <td>Date _______________</td>
                <td> Signature of Class Teacher _______________</td>
                <td> Signature of Principal _______________</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          {" "}
          <h4>
            {" "}
            8-point grading scale:- A1(91-100), A2(81-90), B1(71-80), B2(61-70),
            C1(51-60), C2(41-50), D(33-40), E(32&amp;Below)
          </h4>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default MarksheetTable;
