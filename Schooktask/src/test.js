import React, { useState, useRef } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const MyComponent = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const contentRef = useRef(null);

  const handleViewClick = (user) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      const input = contentRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('user-information.pdf');
        setIsPrinting(false);
      });
    }, 1000);
  };

  const users = [
    { id: 1, name: 'John Doe', age: 30, gender: 'Male', email: 'john.doe@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Doe', age: 25, gender: 'Female', email: 'jane.doe@example.com', phone: '555-5678' },
    { id: 3, name: 'Bob Smith', age: 35, gender: 'Male', email: 'bob.smith@example.com', phone: '555-9012' },
    { id: 4, name: 'Sue Johnson', age: 40, gender: 'Female', email: 'sue.johnson@example.com', phone: '555-3456' },
    { id: 5, name: 'Tom Jones', age: 45, gender: 'Male', email: 'tom.jones@example.com', phone: '555-7890' },
  ];

  return (
    <Box border={1} padding={2}>
      <Typography variant="h5">My Table</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleViewClick(user)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedUser && (
        <Box position="fixed" top={0} left={0} width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
          <Box position="absolute" top={0} left={0} width="100%" height="100%" onClick={handleClose} />
          <Box position="relative" width="80%" height="80%" bgcolor="white" boxShadow={2} padding={2} ref={contentRef}>
            <Typography variant="h5" align="center" marginBottom={2}>
              User Information
            </Typography>
            <Typography>Name: {selectedUser.name}</Typography>
            <Typography>Age: {selectedUser.age}</Typography>
            <Typography>Gender: {selectedUser.gender}</Typography>
            <Typography>Email: {selectedUser.email}</Typography>
            <Typography>Phone: {selectedUser.phone}</Typography>
          </Box>
          <Box position="absolute" bottom={1} right={1}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outlined" onClick={handlePrint} disabled={isPrinting}>
              {isPrinting ? 'Printing...' : 'Print / Download PDF'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyComponent;