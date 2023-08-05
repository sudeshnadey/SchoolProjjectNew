import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  Modal,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MarksheetState } from "./context/manage_marks_context";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import img1 from "../../img/img1.png";
import ReactToPrint from "react-to-print";
import MarksheetTable from "./table/MarksheetTable";
import classes from "./showMarksheetbyClass.module.css";
function MarksheetbyClassForm() {
  const {
    allData,
    marksheet,
    allclass,
    showSection_name,
    subjectName,
    halfyearly,
    viewMarksheet,
    yearly,
    halfYearlyAll,
    yearlyAll,
    // changeCount,
    getData,
    getMarksheet,
    // getAllClass,
    getShowSection,
    getSubject,
    getUpdate,
    getHalfYearly,
    getViewMarksheet,
    getYearly,
    getHalfYearlyAll,
    getYearlyAll,
  } = MarksheetState() || {};
  const { data } = allData || {};
  const subjectType = ["Regular Subject"];

  const subjectSubField = [
    { subjectSubField_name: "PT(Term-1)", subjectSubField_id: "obtain_mark" },
    {
      subjectSubField_name: "Note Book(Term-1)",
      subjectSubField_id: "obtain_mark_sa",
    },
    {
      subjectSubField_name: "Subject Enrichment(Term-1)",
      subjectSubField_id: "subject_enrichmenth",
    },
    {
      subjectSubField_name: "Half Yearly(Term-1)",
      subjectSubField_id: "h_yrly",
    },
    {
      subjectSubField_name: "PT(Term-2)",
      subjectSubField_id: "obtain_mark_pt_2",
    },
    {
      subjectSubField_name: "Note Book(Term-2)",
      subjectSubField_id: "obtain_mark_sa_2",
    },
    {
      subjectSubField_name: "Subject Enrichment(Term-2)",
      subjectSubField_id: "subject_enrichmentf",
    },
    { subjectSubField_name: "Yearly(Term-2)", subjectSubField_id: "yrly" },
  ];
  const [showBox, setShowBox] = useState(false);
  const [formData, setFormData] = useState({
    selectedClass: "",
    selectedMarkSheet: "",
    subject_Type: "",
    subject_Name: "",
    subject_SubField: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const contentRef = useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenn = () => setOpen(true);
  const handleClosee = () => setOpen(false);

  const [check, setCheck] = useState(false);
  const [checkk, setCheckk] = useState(false);
  const singleHalfyearly = halfyearly?.data;
  useEffect(() => {
    if (formData.selectedClass && formData.selectedClass.class_id) {
      getMarksheet(formData);
    }
  }, [formData.selectedClass]);
  useEffect(() => {
    getSubject(formData);
  }, [formData.selectedMarkSheet]);
  const style = {
    marginTop: "20%",
    marginBottom: "100px",
    width: "500px",
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
    // console.log(event);
    // console.log(formData);

    // console.log(formData)
  };
  const handlePrintPage = () => {
    const printableContent = document.getElementById("printable-content");
    const printWindow = window.open("", "", "height=1000,width=1000");
    printWindow.document.write(printableContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSubmit = (event) => {
    if (formData?.selectedClass?.class_id && formData?.selectedMarkSheet) {
      event.preventDefault();

      getData(formData);

      getMarksheet(formData);
      getShowSection(formData);

      setShowBox(true);
      // console.log(formData);
      // console.log(viewMarksheet);
    }
  };

  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterTermChange = (event) => {
    setFilterTerm(event.target.value);
  };

  // const filteredData = allData?.filter(
  //   (item) =>
  //     item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.section.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const inputRefs = useRef([]);
  // const handleOnClickInput=(event, index, id) => {
  //     console.log(id)
  //   if(event){
  //     const studentId = id;
  //       const marksheetId = formData.selectedMarkSheet.marksheet_id;
  //       const classId = formData?.selectedClass?.class_id;
  //       const subjectSubField = formData?.subject_SubField?.subjectSubField_id;
  //       getViewMarksheet({ studentId, marksheetId, classId, subjectSubField });
  //   }
  // };

  const handleKeyPress = (event, index, id) => {
    // const studentId = id;
    // const marksheetId = formData.selectedMarkSheet.marksheet_id;
    // const classId = formData?.selectedClass?.class_id;
    // const subjectSubField = formData?.subject_SubField?.subjectSubField_id;
    // getViewMarksheet({ studentId, marksheetId, classId, subjectSubField });
    // console.log(viewMarksheet);
    // const marksheet_student_id = viewMarksheet?.data.filter(function)

    // console.log(event.target.value);
    const number = parseInt(event.target.value);
    // console.log(formData);
    const subjectSubField = formData?.subject_SubField?.subjectSubField_id;
    getUpdate({ id, number, subjectSubField });

    if (event.key === "Enter") {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (user) => {
    // console.log(user)
    const studentId = user?.student_id;
    const marksheetId = formData.selectedMarkSheet.marksheet_id;
    const classId = formData?.selectedClass?.class_id;
    const subjectSubField = formData?.subject_SubField?.subjectSubField_id;
    getViewMarksheet({ studentId, marksheetId, classId, subjectSubField });
    // console.log(viewMarksheet);
    getHalfYearly(user);
    setSelectedUser(user);
    // setStudents(viewMarksheet);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      const input = contentRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("user-information.pdf");
        setIsPrinting(false);
      });
    }, 1000);
  };
  // console.log("ok");
  // console.log(halfYearlyAll);

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        style={{ fontWeight: "bold", marginLeft: "100px" }}
      >
        Manage Marks
      </Typography>

      <Box sx={{ flexGrow: 1, paddingLeft: "150px" }}>
        <form onSubmit={handleSubmit}>
          <label>Class</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            name="selectedClass"
            fullWidth
            helperText=" "
            value={formData.selectedClass}
            onChange={handleInputChange}
            margin="normal"
          >
            {allclass?.map((option) => (
              <MenuItem
                key={option.class_id}
                id={option.class_id}
                value={option}
              >
                {option.class_name}
              </MenuItem>
            ))}
          </TextField>
          <label>Class Numeric Name</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Class Numeric"
            name="selectedClass"
            fullWidth
            helperText=" "
            value={formData.selectedClass}
            onChange={handleInputChange}
            margin="normal"
          >
            {/* {allclass?.map((option) => ( */}
            <MenuItem
              // key={option}
              // id={option}
              value={formData.selectedClass}
            >
              {formData.selectedClass.numeric_name}
            </MenuItem>
            {/* ))} */}
          </TextField>
          <label>Marksheet</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Marksheet"
            name="selectedMarkSheet"
            fullWidth
            helperText=" "
            value={formData.selectedMarkSheet}
            onChange={handleInputChange}
            margin="normal"
          >
            {marksheet?.map((option) => (
              <MenuItem key={option.marksheet_id} value={option}>
                {option.marksheet_name}
              </MenuItem>
            ))}
          </TextField>
          <label>Subject Type</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Type"
            name="subject_Type"
            fullWidth
            helperText=" "
            value={formData.subject_Type}
            onChange={handleInputChange}
            margin="normal"
          >
            {subjectType?.map((option) => (
              <MenuItem key={option} id={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <label>Subject</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Subject"
            name="subject_Name"
            fullWidth
            helperText=" "
            value={formData.subject_Name}
            onChange={handleInputChange}
            margin="normal"
          >
            {subjectName?.data?.map((option) => (
              <MenuItem
                key={option.subject_id}
                id={option.subject_id}
                value={option}
              >
                {option.subject_name}
              </MenuItem>
            ))}
          </TextField>
          <label>Subject (SubField)</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select  (SubField)"
            name="subject_SubField"
            fullWidth
            helperText=" "
            value={formData.subject_SubField}
            onChange={handleInputChange}
            margin="normal"
          >
            {subjectSubField.map((option) => (
              <MenuItem key={option.subjectSubField_id} value={option}>
                {option.subjectSubField_name}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>

      {showBox && (
        <Box mt={2} style={{ marginLeft: "100px" }}>
          <Typography variant="h5" gutterBottom>
            Student info
          </Typography>
          <Box>
            <Typography>
              Class: {formData?.selectedClass?.class_name}
            </Typography>
            <Typography>
              Marksheet Name: {formData?.selectedMarkSheet?.marksheet_name}
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value} defaultValue={1}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="All Student" value="1" />
                  {showSection_name?.map((item) => (
                    <Tab label={`Section( ${item.section_name})`} value="2" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box mt={2}>
                  <Typography variant="h5" gutterBottom>
                    Table:
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    mb={2}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Section</TableCell>
                        <TableCell>
                          {formData.subject_SubField?.subjectSubField_name}
                        </TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((item, index) => (
                        <TableRow key={item.student_id}>
                          <TableCell>
                            <img
                              src={`http://management.gdicskp.in/${item?.image}`}
                              style={{ width: "20%" }}
                            />
                          </TableCell>
                          <TableCell>{item.student_name}</TableCell>
                          <TableCell>{item.class_name}</TableCell>
                          <TableCell>{item.section_name}</TableCell>
                          <TableCell>
                            <input
                              ref={(el) => (inputRefs.current[index] = el)}
                              type="text"
                              defaultValue={item.examname}
                              // onClick={(e) =>handleOnClickInput(e, index, item.student_id)}
                              onKeyPress={(e) =>
                                handleKeyPress(
                                  e,
                                  index,
                                  item.marksheet_student_id
                                )
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleViewClick(item)}
                            >
                              {" "}
                              Action
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {selectedUser && (
                    <div
                      id="printable-content"
                      className={classes.printable_content}
                    >
                      <Box
                        position="fixed"
                        top={0}
                        left={0}
                        backdrop-filter="blur(10px)"
                        bgcolor="rgba(255, 255, 255, 0.508)"
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                          onClick={handleClose}
                        />
                        <Box
                          position="relative"
                          width="90%"
                          height="70%"
                          bgcolor="white"
                          boxShadow={2}
                          padding={2}
                          ref={contentRef}
                        >
                          <button
                            onClick={handlePrintPage}
                            style={{ backgroundColor: "white" }}
                          >
                            Print
                          </button>

                          <div
                            style={{
                              overflowX: "auto",
                              overflowY: "auto",
                              maxHeight: "100%",
                              maxWidth: "100%",
                            }}
                          >
                            {" "}
                            <MarksheetTable
                              studentInfo={halfyearly}
                              viewMarksheet={viewMarksheet}
                              examName={
                                formData?.subject_SubField.subjectSubField_name
                              }
                              examYear={
                                formData?.selectedMarkSheet.marksheet_name
                              }
                            />
                          </div>
                        </Box>
                      </Box>
                    </div>
                  )}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    // count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                {" "}
                <Box mt={2}>
                  <Typography variant="h5" gutterBottom>
                    Table:
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    mb={2}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Section</TableCell>
                        <TableCell>
                          {formData.subject_SubField?.subjectSubField_name}
                        </TableCell>

                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((item, index) =>
                        item?.section_name === "(A)" ? (
                          <TableRow key={item.student_id}>
                            <TableCell>
                              <img
                                src={`http://management.gdicskp.in/${item?.image}`}
                                style={{ width: "20%" }}
                              />
                            </TableCell>
                            <TableCell>{item.student_name}</TableCell>
                            <TableCell>{item.class_name}</TableCell>
                            <TableCell>{item.section_name}</TableCell>
                            <TableCell>
                              <input
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                defaultValue={item.examname}
                                onKeyPress={(e) =>
                                  handleKeyPress(e, index, item.student_id)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                onClick={() => handleViewClick(item)}
                              >
                                {" "}
                                Action
                              </Button>
                            </TableCell>
                          </TableRow>
                        ) : (
                          <div>
                            <h2> There is No student In Section (A)</h2>
                            <br />
                          </div>
                        )
                      )}
                    </TableBody>
                  </Table>
                  {selectedUser && (
                    <div
                      id="printable-content"
                      className={classes.printable_content}
                    >
                      <Box
                        position="fixed"
                        top={0}
                        left={0}
                        backdrop-filter="blur(10px)"
                        bgcolor="rgba(255, 255, 255, 0.508)"
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                          onClick={handleClose}
                        />
                        <Box
                          position="relative"
                          width="90%"
                          height="70%"
                          bgcolor="white"
                          boxShadow={2}
                          padding={2}
                          ref={contentRef}
                        >
                          <button
                            onClick={handlePrintPage}
                            style={{ backgroundColor: "white" }}
                          >
                            Print
                          </button>

                          <div
                            style={{
                              overflowX: "auto",
                              overflowY: "auto",
                              maxHeight: "100%",
                              maxWidth: "100%",
                            }}
                          >
                            {" "}
                            <MarksheetTable
                              studentInfo={halfyearly}
                              viewMarksheet={viewMarksheet}
                              examName={
                                formData?.subject_SubField.subjectSubField_name
                              }
                              examYear={
                                formData?.selectedMarkSheet.marksheet_name
                              }
                            />
                          </div>
                        </Box>
                      </Box>
                    </div>
                  )}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    // count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MarksheetbyClassForm;
