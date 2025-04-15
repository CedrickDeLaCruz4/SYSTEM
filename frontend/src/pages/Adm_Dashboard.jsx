import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Button,
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Container,
  } from "@mui/material";

  

const AdmissionDashboard = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
          const result = await axios.get("http://localhost:5000/admitted_users");
          setUsers(result.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

    const handleTransfer = async (person_id) => {
        try {
            await axios.post("http://localhost:5000/transfer", { person_id }, { headers: { "Content-Type": "application/json" } });
        } catch (error) {
            console.error("Error during transfer:", error);
        }
    };

    return (
        <Container>  
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{ textAlign: "center"}}>Person ID</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Email Address</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>{user.person_id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                    <TableCell sx={{display: "flex", justifyContent: 'center'}}>
                        <Button
                        onClick={() => handleTransfer(user.person_id)}
                        variant="contained"
                        style={{backgroundColor: '#6D2323'}}
                      >
                        transfer
                      </Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

        </ Container >
    );
};

export default AdmissionDashboard;
