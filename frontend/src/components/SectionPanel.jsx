import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box,
} from '@mui/material';

const SectionPanel = () => {
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);

  // Fetch all sections from the server on component mount
  useEffect(() => {
    fetchSections();
  }, []);
  
  const fetchSections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/section_table');
      setSections(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle form submission to insert a new section
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the description as part of an object in the request body
      await axios.post('http://localhost:5000/section_table', { description });
  
      // Clear the input field after successful submission
      setDescription('');
  
      // Fetch the updated sections after insertion
      fetchSections(); // Re-fetch sections to update the list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Section Panel Form
        </Typography>

        {/* Form to insert a new section */}
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              label="Section Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#7b1f1f', color: '#fff' }}
            >
              Insert
            </Button>
          </Box>
        </form>

        {/* Displaying the list of sections */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Section List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Section Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell>{section.id}</TableCell>
                  <TableCell>{section.section_description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default SectionPanel;