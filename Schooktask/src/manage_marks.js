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
import img1 from "../src/img/img1.png";
import ReactToPrint from "react-to-print";
function MyForm() {
  const {
    allData,
    marksheet,
    allclass,
    showSection_name,
    halfyearly,
    yearly,
    halfYearlyAll,
    yearlyAll,
    // changeCount,
    getData,
    getMarksheet,
    // getAllClass,
    getShowSection,
    getHalfYearly,
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
  // const [data, setData] = useState([
  //   { id: 1, name: "John Smith", class: "3", section: "B" },
  //   { id: 2, name: "Jane Doe", class: "3", section: "A" },
  //   { id: 3, name: "Bob Johnson", class: "3", section: "D" },
  //   { id: 4, name: "Alice Williams", class: "3", section: "C" },
  //   { id: 5, name: "Charlie Brown", class: "3", section: "B" },
  //   { id: 6, name: "Sarah Davis", class: "3", section: "A" },
  // ]);
  const names = ["2022-23", "2021-22", "2020-21", "Kelly Snyder"];
  const emails = ["2022-23", "2021-22", "2020-21", "Kelly Snyder"];

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
  // useEffect(() => {
  //   if (formData.selectedClass && formData.selectedClass.class_id) {
  //     getMarksheet(formData);
  //   }
  // }, [formData.selectedClass]);
  const style = {
    marginTop: "20%",
    marginBottom: "100px",
    width: "500px",
  };
  const handleInputChange = (event) => {
    // if(formData?.selectedClass?.class_id) {
    //   getMarksheet(formData);
    // }
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handlePrintPage = () => {
    const printableContent = document.getElementById("printable-content");
    const printWindow = window.open("", "", "height=1000,width=1000");
    printWindow.document.write(printableContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData(formData);
    getShowSection(formData);

    setShowBox(true);

    //here
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
    getHalfYearly(user);
    setSelectedUser(user);
  };

  // const handleViewClickApi = async (period) => {
  //   const response = await fetch(
  //     `https://jsonplaceholder.typicode.com/${period}`
  //   );
  //   const data = await response.json();
  //   setSelectedData(data);
  // };
  const handleViewClickApi = async (period) => {
    // const response = await fetch(
    //   `https://jsonplaceholder.typicode.com/${period}`
    // );
    // const data = await response.json();
    // setSelectedData(data);
    setCheckk(true);
    handleOpenn();
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
  const handleYearlyAllData = () => {
    getYearlyAll(formData);
    console.log(yearlyAll);
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
            {marksheet_session?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
              Marksheet Name: {formData?.selectedMarkSheet}
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box>
              <Button
                variant="outlined"
                // onClick={() => handleViewClickApi("half-yearly")}
                onClick={handleHalfYearlyAllData}
              >
                {" "}
                HalfYearly
              </Button>
              <div>
                {/* { <Button onClick={handleOpenn}>Open modal</Button>   } */}
                <Modal
                  open={open}
                  onClose={handleClosee}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{ marginBottom: "100px", paddingRight: "100px" }}
                >
                  <Box
                    sx={style}
                    style={{
                      paddingLeft: "200px",
                      marginTop: "50px",
                      marginBottom: "100px",
                    }}
                  >
                    <div
                      style={{
                        height: "500px",
                        overflow: "auto",
                        backgroundColor: "white",
                        width: "100%",
                        marginBottom: "100px",
                      }}
                    >
                      <button
                        onClick={() => window.print()}
                        style={{ backgroundColor: "white" }}
                      >
                        Print
                      </button>

                      {data?.map((item) => (
                        <Box key={item.id}>
                          <Box>
                            <div>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                paddingTop="100px"
                              >
                                {/* <img src="path/to/your/image.png" alt="Contact" style={{ marginRight: "10px" }} /> */}

                                <img
                                  src={img1}
                                  alt="logoimage"
                                  height="104px"
                                  width="500px"
                                ></img>
                              </Box>
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                    marginLeft: "30px",
                                  }}
                                >
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
                                    src={`http://management.gdicskp.in/${item?.image}`}
                                    style={{
                                      width: "20%",
                                      marginLeft: "400px",
                                      marginTop: "30px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </Box>
                        </Box>
                      ))}
                    </div>
                  </Box>
                </Modal>
              </div>
              <div style={{ marginTop: "30px" }}>
                <Button
                  variant="outlined"
                  onClick={() => handleViewClickApii("yearly")}
                >
                  {" "}
                  Yearly
                </Button>
                <div>
                  {/* <Button onClick={handleOpenn}>Open modal</Button>   */}
                  <Modal
                    open={open}
                    onClose={handleClosee}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{ marginBottom: "100px" }}
                  >
                    <Box
                      sx={style}
                      style={{
                        paddingLeft: "200px",
                        marginTop: "50px",
                        marginBottom: "100px",
                      }}
                    >
                      <div
                        style={{
                          height: "500px",
                          overflow: "auto",
                          backgroundColor: "white",
                          width: "200%",
                          marginBottom: "100px",
                        }}
                      >
                        {/* <button onClick={() => window.print()} style={{ margin: "20px", backgroundColor: "white" }}>Print</button> */}

                        <div>
                          <Button
                            onClick={handlePrintPage}
                            variant="contained"
                            color="primary"
                          >
                            Print
                          </Button>

                          <div id="printable-content">
                            <Box>
                              {data?.map((item) => (
                                <Box
                                  key={item.id}
                                  border={"1px solid black"}
                                  style={{
                                    border: "2px solid black",
                                    paddingTop: "50px",
                                    paddingBottom: "50px",
                                  }}
                                >
                                  <Box>
                                    <div>
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
                                      <div style={{ display: "flex" }}>
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            marginBottom: "20px",
                                            marginLeft: "30px",
                                          }}
                                        >
                                          <Typography>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Roll No:{" "}
                                            </span>
                                            {item.rollno}
                                          </Typography>
                                          <Typography>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Name:{" "}
                                            </span>
                                            {item.student_name}
                                          </Typography>
                                          <Typography>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Father's Name:{" "}
                                            </span>
                                            {item.father_name}
                                          </Typography>
                                          <Typography>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Mother's Name:{" "}
                                            </span>
                                            {item.mother_name}
                                          </Typography>
                                          <Typography>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Class & Section:{" "}
                                            </span>
                                            {item.class} {item.section}
                                          </Typography>
                                          <Typography>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Date of Birth:{" "}
                                            </span>
                                            {item.dob}
                                          </Typography>
                                        </div>
                                        <div>
                                          <img
                                            src={`http://management.gdicskp.in/${item?.image}`}
                                            style={{
                                              width: "20%",
                                              marginLeft: "400px",
                                              marginTop: "30px",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          </div>
                          <div>
                            <hr style={{ borderBottom: "2px solid black" }} />
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
            </Box>
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
                        <TableCell>Half Yearly</TableCell>
                        <TableCell>Yearly</TableCell>
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
                              View
                            </Button>
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
                          
                          {singleHalfyearly?.map((item) => (
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
                        <TableCell>Half Yearly</TableCell>
                        <TableCell>Yearly</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((item) =>
                        item?.section == "(A)" ? (
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
                                View
                              </Button>
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
                        ) : (
                          <div><h2> There is No student In Section (A)</h2>
                          <br /></div>
                        )
                      )}
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
                          {singleHalfyearly?.map((item) => (
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
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MyForm;
