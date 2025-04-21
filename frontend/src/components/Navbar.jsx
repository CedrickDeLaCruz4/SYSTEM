import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png';
import '../styles/NavBar.css';

const Navbar = ({ isAuthenticated }) => {

    return (
        <div className="NavBar">
            <Link to={isAuthenticated ? '/dashboard' : '/'}>
                <div className="LogoContainer">
                    <div className="LogoImage">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="LogoTitle">
                        <span>Eulogio "Amang" Rodriguez</span>
                        <span>Institute of Science and Technology</span>
                    </div>
                </div>
            </Link>

            <div className="NavBarContainer">
                {!isAuthenticated ? (
                    <div className="NavBarItems">
                        <Link to={'/home'}>
                            <div className="MenuButton">
                                <span>Home</span>
                            </div>
                        </Link>
                        <Link to={'/programs'}>
                            <div className="MenuButton">
                                <span>Programs</span>
                            </div>
                        </Link>
                        <Link to={'/about'}>
                            <div className="MenuButton">
                                <span>About</span>
                            </div>
                        </Link>
                        <Link to={'/contact'}>
                            <div className="MenuButton">
                                <span>Contacts</span>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="NavBarItems">
                        <Link to={'/dashboard'}>
                            <div className="MenuButton">
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <Link to={'/profile'}>
                            <div className="MenuButton">
                                <span>Profile</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
