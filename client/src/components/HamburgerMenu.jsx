import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "transparent",
          color: "black",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: "30px",
            height: "3px",
            backgroundColor: "black",
            margin: "5px 0",
            transition: "0.3s",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "3px",
            backgroundColor: "black",
            margin: "5px 0",
            transition: "0.3s",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "3px",
            backgroundColor: "black",
            margin: "5px 0",
            transition: "0.3s",
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px", // Below the hamburger icon
            right: "20px",
            backgroundColor: "#014B3F", // Dark green background
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            zIndex: 999,
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              Home
            </li>
            <li
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => {
                navigate("/form");
                setIsOpen(false);
              }}
            >
              Form
            </li>
            <li
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => {
                navigate("/about");
                setIsOpen(false);
              }}
            >
              About Us
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
