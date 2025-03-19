import React from "react";
import HamburgerMenu from "./HamburgerMenu"; // Import your existing HamburgerMenu component

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#FFF6EF", // Background color
        display: "flex", // Use Flexbox for layout
        justifyContent: "space-between", // Space items across the header
        alignItems: "center", // Center items vertically
        padding: "10px 20px", // Add padding for spacing
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for depth
      }}
    >
      {/* Centered Title */}
      <h1
        style={{
          flex: 1, // Take up available space to center the title
          textAlign: "center", // Center-align the text horizontally
          margin: 0, // Remove default margin
          color: "#014B3F", // Dark green text color for contrast
          fontSize: "24px", // Adjust font size as needed
          fontWeight: "bold",
        }}
      >
        Immigration Assistant
      </h1>

      {/* Hamburger Menu */}
      <div style={{ position: "absolute", right: "20px" }}>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
