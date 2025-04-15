import React, { useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/Container.css';
import Logo from '../assets/Logo.png';
import { Container, Checkbox } from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';

const Register = () => {
    const [usersData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5000/register", usersData);
            setUserData({ username: '', email: '', password: '' });  // Reset the state correctly
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>
            <Container style={{display: "flex", alignItems: "center", justifyContent: 'center', height: '100%'}}>  
            <div className="Container">
                    <div className="Header">
                        <div className="HeaderTitle">
                            <div className="CircleCon">
                                <img src={Logo} alt="" />
                            </div>
                        </div>
                        <div className="HeaderBody">
                            <strong>EARIST</strong>
                            <p>Information System</p>
                        </div>
                    </div>
                    <div className="Body">
                        <div className="TextField">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder="Enter your email address" value={usersData.username} onChange={handleChanges}/>
                        </div>
                        <div className="TextField">
                            <label htmlFor="email">Email Address</label>
                            <input type="text" id="email" name="email" placeholder="Enter your email address" value={usersData.email} onChange={handleChanges}/>
                        </div>
                        <div className="TextField">
                            <label htmlFor="password">Password</label>
                            <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" value={usersData.password} onChange={handleChanges} required/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: "rgba(0,0,0,0.3)", outline: "none", position: "absolute", top: "32px", right: "0px", background: "none", border: "none", cursor: "pointer"}}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>  
                        <div className="Button" onClick={handleRegister}>
                            <span>Register</span>
                        </div>
                        <div className="LinkContainer">
                            <span>Forget password?</span>
                        </div>
                        <div className="LinkContainer RegistrationLink">
                            <p>Already Have an Account?</p>
                            <span><Link to={'/login'}>Sign In here</Link></span>
                        </div>
                    </div>
                    <div className="Footer">
                        <div className="FooterText">
                        &copy; 2025 EARIST Information System. All rights reserved.
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register;
