import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterProf = () => {
  const [profForm, setProfForm] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProfForm(prevState => ({ ...prevState, [name]: value }));
};

  const handleRegister = async () => {
    if (!profForm.fname || !profForm.mname || !profForm.lname ||
        !profForm.email || !profForm.password
    ) {
      alert("please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register_prof", profForm, { headers: { "Content-Type": "application/json" } });
      setProfForm(response.data.message);
      navigate("/login_prof");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Container>
      <Typography>Register</Typography>
      <TextField label="First Name" fullWidth margin="normal" name="fname" value={profForm.fname} onChange={handleChanges} />
      <TextField label="Middle Name" fullWidth margin="normal" name="mname" value={profForm.mname} onChange={handleChanges } />
      <TextField label="Last Name" fullWidth margin="normal" name="lname" value={profForm.lname} onChange={handleChanges } />
      <TextField label="Email Address" fullWidth margin="normal" name="email" value={profForm.email} onChange={handleChanges } />
      <TextField label="Password" type="password" fullWidth margin="normal" name="password" value={profForm.password} onChange={handleChanges } />
    
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default RegisterProf;
