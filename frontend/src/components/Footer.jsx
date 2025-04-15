import React from "react";

const Footer = () => {
    const footerStyle = {
        backgroundColor: "#6D2323",
        color: "#ffffff",
        padding: "20px",
        width: "100%",
        position: "fixed",
        height: "50px",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };

    const textStyle = {
        margin: 0,
        fontSize: "14px",
        textAlign: "center",
    };

    return (
        <div className="FooterContainer" style={footerStyle}>
            <p style={textStyle}>
                © Eulogio "Amang" Rodriguez Institute of Science and Technology - Manila Campus 2025
            </p>
        </div>
    );
};

export default Footer;