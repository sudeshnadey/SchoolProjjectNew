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
import ReactToPrint from "react-to-print";
import MarksheetTable from "./table/MarksheetTable";
function MarksheetForm() {
  const {
    allData,
    marksheet,
    allclass,
    showSection_name,
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
    getHalfYearly,
    getViewMarksheet,
    getYearly,
    getHalfYearlyAll,
    getYearlyAll,
  } = MarksheetState() || {};
  const { data } = allData || {};
  const marksheet_session = ["2022-2023", "2023-2024"];
  const [showBox, setShowBox] = useState(false);
  const [formData, setFormData] = useState({
    selectedClass: "",
    selectedMarkSheet: "",
  });
  const students = [
    { name: "John Doe", math: 85, science: 78, english: 90 },
    // Add more students as needed
  ];
  // const [data, setData] = useState([
  //   { id: 1, name: "John Smith", class: "3", section: "B" },
  //   { id: 2, name: "Jane Doe", class: "3", section: "A" },
  //   { id: 3, name: "Bob Johnson", class: "3", section: "D" },
  //   { id: 4, name: "Alice Williams", class: "3", section: "C" },
  //   { id: 5, name: "Charlie Brown", class: "3", section: "B" },
  //   { id: 6, name: "Sarah Davis", class: "3", section: "A" },
  // ]);
  // const names = ["2022-23", "2021-22", "2020-21", "Kelly Snyder"];
  // const emails = ["2022-23", "2021-22", "2020-21", "Kelly Snyder"];

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
    getViewMarksheet({ studentId, marksheetId, classId });
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
            helperText="Please select class"
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
          <label>Marksheet</label>
          <TextField
            id="outlined-select-currency"
            select
            label="Select Class"
            name="selectedMarkSheet"
            fullWidth
            helperText="Please select class"
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
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((item) => (
                        <TableRow key={item.student_id}>
                          <TableCell>
                            <img
                              src={`http://management.gdicskp.in/${item?.image}`}
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
                    <div id="printable-content">
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
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((item) =>
                        item?.section === "(A)" ? (
                          <TableRow key={item.student_id}>
                            <TableCell>
                              <img
                                src={`http://management.gdicskp.in/${item?.image}`}
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
                    <div id="printable-content">
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

export default MarksheetForm;
