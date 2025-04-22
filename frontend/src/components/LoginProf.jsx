import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginProf = () => {
    const [usersData, setUserData] = useState({
        email: '',
        password: '',
    });
  
    const navigate = useNavigate();
 
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };
  
    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (!usersData.email || !usersData.password) {
            alert("Please fill all required credentials");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/login_prof',
                usersData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  }
                }
            );

            console.log('Login response status:', response.status);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("prof_id", response.data.prof_id);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("fname", response.data.fname);
            localStorage.setItem("mname", response.data.mname);
            localStorage.setItem("lname", response.data.lname);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("subject_section_mappings", JSON.stringify(response.data.subject_section_mappings));
            localStorage.setItem("school_year_id", response.data.school_year_id);

            alert("Login successful!");

            navigate("/faculty_dashboard");
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid Credentials');
        }
    };
  

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Login</Typography>
      <TextField label="email" fullWidth margin="normal" name="email" value={usersData.email} onChange={handleChanges} />
      <TextField label="Password" type="password" name="password"fullWidth margin="normal" value={usersData.password} onChange={handleChanges} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginProf;
