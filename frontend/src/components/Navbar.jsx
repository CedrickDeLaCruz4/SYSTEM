import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png';
import '../styles/NavBar.css';

const Navbar = () => {
    return(
        <div className="NavBar">
            <Link to={'/home'}>
            <div className="LogoContainer">
                <div className="LogoImage">
                    <img src={Logo} alt="" />
                </div>
                <div className="LogoTitle">
                    <span>Eulogio "Amang" Rodriguez</span>
                    <span>Institute of Science and Technology</span>
                </div>
            </div>
            </Link>
            <div className="NavBarContainer">
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
            </div>
        </div>
    )
}

export default Navbar