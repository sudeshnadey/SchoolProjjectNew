import React from "react";
import classes from "./MarksheetTable.module.css";

const MarksheetTable = ({ viewMarksheet, studentInfo }) => {
  const results = viewMarksheet?.data || [];

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

  return (
    <div className={classes.marksheet}>
      {/* {viewMarksheet?.data?.map((item) => ( */}
      <div className={classes.head}>
        <h1 className={classes.heading}>Annual Report Card </h1>
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
                <th colspan="">Scholastic Areas</th>
                <th colspan="6">Term - 1 (100 marks)</th>
                <th colspan="6">Term - 2 (100 marks)</th>
              </tr>
              <tr>
                <th>Subject Name</th>
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
              {results?.map((item) => (
                <tr>
                  <td>{item.subject_name}</td>
                  <td>{item.obtain_mark}</td>
                  <td>{item.obtain_mark_sa}</td>
                  <td>{item.subject_enrichmenth}</td>
                  <td>{item.h_yrly}</td>
                  <td>{item.Marks_Obtained_pt1}</td>
                  <td>{getGrade(item.Marks_Obtained_pt1)}</td>
                  <td>{item.obtain_mark_pt_2}</td>
                  <td>{item.obtain_mark_sa_2}</td>
                  <td>{item.subject_enrichmentf}</td>
                  <td>{item.yrly}</td>
                  <td>{item.Marks_Obtained_pt2}</td>
                  <td>{getGrade(item.Marks_Obtained_pt2)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td colspan="3">Term 1:-</td>
                <td colspan="1">543</td>
                <td colspan="2">600</td>
                <td colspan="3">Term 2:-</td>
                <td colspan="1">558</td>
                <td colspan="2">600</td>
              </tr>
              <tr>
                <td>Total</td>
                <td colspan="3">1200</td>
                <td>1101</td>
                <td colspan="2">Percentage</td>
                <td colspan="2">91.75 %</td>
                <td colspan="4">Overall Grade :- A1</td>
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
                <td>Date</td>
                <td> Signature of Class Teacher</td>
                <td> Signature of Principal</td>
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
