import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Checkbox } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import '../styles/Container.css';
import Logo from '../assets/Logo.png';

const Login = () => {
    const [usersData, setUserData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!usersData.email || !usersData.password) {
            setErrorMessage("Please fill all required credentials");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usersData),
            });

            console.log('Login response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Login response data:', data);

                if (data.token) {
                    localStorage.setItem('token', data.token);
                    const decoded = JSON.parse(atob(data.token.split('.')[1]));
                    console.log('Decoded JWT:', decoded);

                    // ✅ Redirect to dashboard
                    navigate('/dashboard');
                } else {
                    setErrorMessage('No token received from the server.');
                    console.error('No token received');
                }
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Invalid credentials');
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid Credentials');
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
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={usersData.email}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="TextField" style={{ position: 'relative' }}>
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={usersData.password}
                                onChange={handleChanges}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    color: "rgba(0,0,0,0.3)",
                                    outline: "none",
                                    position: "absolute",
                                    top: "32px",
                                    right: "0px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>
                        <div className="Checkbox">
                            <Checkbox id="checkbox" sx={{ color: '#A31D1D', '&.Mui-checked': { color: '#A31D1D' } }} />
                            <label htmlFor="checkbox">Remember Me</label>
                        </div>
                        <div className="Button" onClick={handleLogin}>
                            <span>Log In</span>
                        </div>
                        {errorMessage && (
                            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                                {errorMessage}
                            </div>
                        )}
                        <div className="LinkContainer">
                            <span>Forget password?</span>
                        </div>
                        <div className="LinkContainer RegistrationLink">
                            <p>Doesn't Have an Account?</p>
                            <span><Link to={'/register'}>Register Here</Link></span>
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
}

export default Login;
