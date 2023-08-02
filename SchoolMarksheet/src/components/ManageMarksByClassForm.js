import React from "react";
import { useState, useRef, useEffect } from "react";
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
} from "@mui/material";
import { MarksheetState } from "./fetched_Data";
import ViewMarksheetInfo from "./ViewMarksheetInfo";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import img1 from "../img/img1.png";
import classes from "./ManageMarksByClassForm.module.css";

const ManageMarksByClassForm = () => {
  const {
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
  } = MarksheetState() || {};

  const [showBox, setShowBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [lineSeparation, setlineSeparation] = useState(false);
  const contentRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    selectedClass: "",
    selectedMarkSheet: "",
  });

  useEffect(() => {
    if (formData.selectedClass && formData.selectedClass.class_id) {
      getMarksheet(formData);
    }
  }, [formData.selectedClass]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData(formData);

    setShowBox(true);
  };
  const handleOpenn = () => setOpen(true);
  const handleClosee = () => setOpen(false);
  const [checkk, setCheckk] = useState(false);
  const style = {
    marginTop: "20%",
    marginBottom: "100px",
    width: "500px",
  };
  const handlePrintPage = () => {
    setlineSeparation(true);
    do {
      const printableContent = document.getElementById("printable-content");
      const printWindow = window.open("", "", "height=1000,width=1000");
      printWindow.document.write(printableContent.innerHTML);
      printWindow.document.close();
      printWindow.print();
    } while (lineSeparation === true);
  };
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const filteredData = allData.filter(
  //   (item) =>
  //     item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.section.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleViewClick = (user) => {
    // console.log(user.marksheet_student_id);
    // console.log(user.HalfYearly);
    // console.log(user.Yearly);
    getHalfYearly(user);
    setSelectedUser(user);
    // console.log(halfyearly);
  };
  const handleViewClickApii = async (period) => {
    // const response = await fetch(
    //   `https://jsonplaceholder.typicode.com/${period}`
    // );
    // const data = await response.json();
    // setSelectedData(data);
    setCheckk(false);

    handleOpenn();
  };
  const handleHalfYearlyAllData = () => {
    getHalfYearlyAll(formData);
    console.log(halfYearlyAll);
    setCheckk(true);
    handleOpenn();
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className={classes.marksheet_form}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ fontWeight: "bold", marginLeft: "100px" }}
        >
          Manage Marks
        </Typography>
        <Box>
          <div className={classes.manage_marksfield_input_area}>
            <form onSubmit={handleSubmit}>
              <div className={classes.manage_marksfield_input_column}>
                <div className={classes.manage_marksfield_input_label}>
                  <label>Class</label>
                </div>

                <div className={classes.manage_marksfield_input_box}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    name="selectedClass"
                    fullWidth
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
                </div>
              </div>
              <div className={classes.manage_marksfield_input_column}>
                <div className={classes.manage_marksfield_input_label}>
                  <label>Class Numeric Name</label>
                </div>
                <div className={classes.manage_marksfield_input_box}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    defaultValue="select"
                    name="selectedMarkSheet"
                    fullWidth
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
                </div>
              </div>
              <div className={classes.manage_marksfield_input_column}>
                <div className={classes.manage_marksfield_input_label}>
                  <label>Marksheet</label>
                </div>
                <div className={classes.manage_marksfield_input_box}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    name="selectedMarkSheet"
                    fullWidth
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
                </div>
              </div>
              <div className={classes.manage_marksfield_input_column}>
                <div className={classes.manage_marksfield_input_label}>
                  <label>Subject Type</label>
                </div>
                <div className={classes.manage_marksfield_input_box}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    name="selectedMarkSheet"
                    fullWidth
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
                </div>
              </div>
              <div className={classes.manage_marksfield_input_column}>
                <div className={classes.manage_marksfield_input_label}>
                  <label>Subject</label>
                </div>
                <div className={classes.manage_marksfield_input_box}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    name="selectedMarkSheet"
                    fullWidth
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
                </div>
              </div>
              <div className={classes.manage_marksfield_input_column}>
                <div className={classes.manage_marksfield_input_label}>
                  <label>Subject (SubField)</label>
                </div>
                <div className={classes.manage_marksfield_input_box}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    name="selectedMarkSheet"
                    fullWidth
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
                </div>
              </div>

              <div className={classes.submit_btn}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </div>
      {/* {showBox && ( */}
      <div className={classes.studentInfo_div}>
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.studentInfo_bar}
          >
            Student info
          </Typography>
          <div>
            <Box className={classes.StudentInfo_bar_class}>
              <Typography>
                Class: {formData?.selectedClass?.class_name}
              </Typography>
              <Typography>
                Marksheet Name: {formData?.selectedMarkSheet?.marksheet_name}
              </Typography>
            </Box>
          </div>
          <div>
            <TabContext value={value} defaultValue={1}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="All Student" value="1" />
                  <Tab label="Section ((A))" value="2" />
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
                          {" "}
                          {formData?.subField?.subField_name}
                        </TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allData?.map((item) => (
                        <TableRow key={item.marksheet_student_id}>
                          <TableCell>
                            <img
                              src={`http://management.gdicskp.in/${item.image}`}
                              style={{ width: "20%" }}
                            />
                          </TableCell>
                          <TableCell>{item.student_name}</TableCell>
                          <TableCell>{item.class}</TableCell>
                          <TableCell>{item.section}</TableCell>
                          <TableCell>
                            <input
                              type="text"
                              defaultValue={item.subField_score}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleViewClick(item)}
                            >
                              {" "}
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {selectedUser && (
                    <Box
                      position="fixed"
                      top={0}
                      left={0}
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
                        width="60%"
                        height="70%"
                        bgcolor="white"
                        boxShadow={2}
                        padding={2}
                        ref={contentRef}
                      >
                        <Typography
                          variant="h5"
                          align="center"
                          marginBottom={2}
                          style={{ fontWeight: "bold" }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {/* <img src="path/to/your/image.png" alt="Contact" style={{ marginRight: "10px" }} /> */}

                            <img
                              src={img1}
                              alt="logoimage"
                              height="104px"
                              width="500px"
                            ></img>
                          </Box>
                        </Typography>
                        <Box
                          border="1px solid black"
                          textAlign="center"
                          width="400px"
                          marginLeft="250px"
                        >
                          <Typography
                            variant="h5"
                            align="center"
                            marginBottom={2}
                            style={{ fontWeight: "bold" }}
                          >
                            Half Yearly Exam 2022-23
                          </Typography>
                        </Box>

                        <div style={{ marginTop: "50px" }}>
                          {halfyearly?.map((item) => (
                            <Box
                              display="flex"
                              alignItems="center"
                              marginBottom="10px"
                            >
                              {/* You can add the image here using an <img> tag */}

                              <div>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Roll No:{" "}
                                  </span>
                                  {item.rollno}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Name:{" "}
                                  </span>
                                  {item.student_name}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Father's Name:{" "}
                                  </span>
                                  {item.father_name}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Mother's Name:{" "}
                                  </span>
                                  {item.mother_name}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Class & Section:{" "}
                                  </span>
                                  {item.class} {item.section}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Date of Birth:{" "}
                                  </span>
                                  {item.dob}
                                </Typography>
                              </div>
                              <div>
                                <img
                                  src="path/to/your/image.png"
                                  alt="Student"
                                  style={{ marginLeft: "400px" }}
                                />
                                <Typography
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "400px",
                                  }}
                                >
                                  Principle's Signature
                                </Typography>
                              </div>
                            </Box>
                          ))}
                        </div>
                      </Box>
                      {/* '<Box position="absolute" bottom={1} right={1}>
                            <Button variant="outlined" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={handlePrint}
                              disabled={isPrinting}
                            >
                              {isPrinting ? "Printing..." : "Print / Download PDF"}
                            </Button>
                          </Box>' */}
                    </Box>
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
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allData?.map((item) => (
                        <TableRow key={item.marksheet_student_id}>
                          <TableCell>
                            <img
                              src={`http://management.gdicskp.in/${item.image}`}
                              style={{ width: "20%" }}
                            />
                          </TableCell>
                          <TableCell>{item.student_name}</TableCell>
                          <TableCell>{item.class}</TableCell>
                          <TableCell>{item.section}</TableCell>
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
                    <Box
                      position="fixed"
                      top={0}
                      left={0}
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
                        width="60%"
                        height="70%"
                        bgcolor="white"
                        boxShadow={2}
                        padding={2}
                        ref={contentRef}
                      >
                        <Typography
                          variant="h5"
                          align="center"
                          marginBottom={2}
                          style={{ fontWeight: "bold" }}
                        >
                          <button
                            onClick={() => window.print()}
                            style={{ backgroundColor: "white" }}
                          >
                            Print
                          </button>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {/* <img src="path/to/your/image.png" alt="Contact" style={{ marginRight: "10px" }} /> */}

                            <img
                              src={img1}
                              alt="logoimage"
                              height="104px"
                              width="500px"
                            ></img>
                          </Box>
                        </Typography>
                        <Box
                          border="1px solid black"
                          textAlign="center"
                          width="400px"
                          marginLeft="250px"
                        >
                          <Typography
                            variant="h5"
                            align="center"
                            marginBottom={2}
                            style={{ fontWeight: "bold" }}
                          >
                            Half Yearly Exam 2022-23
                          </Typography>
                        </Box>

                        <div style={{ marginTop: "50px" }}>
                          {halfyearly?.map((item) => (
                            <Box
                              display="flex"
                              alignItems="center"
                              marginBottom="10px"
                            >
                              {/* You can add the image here using an <img> tag */}

                              <div>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Roll No:{" "}
                                  </span>
                                  {item.rollno}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Name:{" "}
                                  </span>
                                  {item.student_name}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Father's Name:{" "}
                                  </span>
                                  {item.father_name}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Mother's Name:{" "}
                                  </span>
                                  {item.mother_name}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Class & Section:{" "}
                                  </span>
                                  {item.class} {item.section}
                                </Typography>
                                <Typography>
                                  <span style={{ fontWeight: "bold" }}>
                                    Date of Birth:{" "}
                                  </span>
                                  {item.dob}
                                </Typography>
                              </div>
                              <div>
                                <img
                                  src="path/to/your/image.png"
                                  alt="Student"
                                  style={{ marginLeft: "400px" }}
                                />
                                <Typography
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "400px",
                                  }}
                                >
                                  Principle's Signature
                                </Typography>
                              </div>
                            </Box>
                          ))}
                        </div>
                      </Box>
                      <Box position="absolute" bottom={1} right={1}>
                        <Button variant="outlined" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handlePrint}
                          disabled={isPrinting}
                        >
                          {isPrinting ? "Printing..." : "Print / Download PDF"}
                        </Button>
                      </Box>
                    </Box>
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
          </div>
        </Box>
      </div>
      {/* )} */}
    </>
  );
};

export default ManageMarksByClassForm;
