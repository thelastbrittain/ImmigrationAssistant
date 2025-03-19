import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <>
      <div
        style={{ display: "flex", height: "50vh", backgroundColor: "#C7BCB4" }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // centers items vertically
            alignItems: "center", // center items horizontally
          }}
        >
          <h1
            style={{
              paddingLeft: "50px",
            }}
          >
            Our Team
          </h1>
          <p
            style={{
              maxWidth: "800px", // Limit the width of the paragraph for readability
              textAlign: "center", // Center-align the text
              fontSize: "16px", // Default font size for readability
              lineHeight: "1.6", // Improve readability with proper line height
              paddingLeft: "50px",
              margin: "30px auto", // Center the paragraph horizontally
            }}
          >
            Welcome to Immigration Assistant! We are a group of BYU students
            participating in the Sandbox program, dedicated to tackling
            challenges related to immigration. Our goal is to develop innovative
            solutions that can make a positive impact on the lives of
            individuals navigating the immigration process. Join us as we
            explore ideas and collaborate to create meaningful change in this
            important area.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleButtonClick}
            style={{
              backgroundColor: "#014B3F", // Set background color
              color: "white", // Set text color for contrast
              padding: "12px 22px", // Increase size with padding
              fontSize: "16px", // Make the text larger
              border: "none", // Remove default border
              cursor: "pointer", // Add pointer cursor on hover
              borderRadius: "0px", // Sharp edges (no rounding)
            }}
          >
            Meet With Us
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#56483E", // Background color
          padding: "40px 20px", // Add padding around the section
          display: "flex", // Use Flexbox for layout
          justifyContent: "center", // Center the boxes horizontally
          gap: "20px", // Add space between the boxes
        }}
      >
        {/* Profile Box 1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Stack image and name vertically
            alignItems: "center", // Center items horizontally
            width: "150px", // Box width
          }}
        >
          <img
            src="alexPaulLinkedIn.jpeg" // Replace with actual image path
            alt="Profile 1"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover", // Ensure the image fits perfectly within the box
              borderRadius: "10px", // Optional: Add rounded corners to the image
            }}
          />
          <p style={{ color: "white", marginTop: "10px" }}>Alex Paul</p>
        </div>

        {/* Profile Box 2 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "150px",
          }}
        >
          <img
            src="LachlanPhillipsLinkedIn.jpeg"
            alt="Profile 2"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <p style={{ color: "white", marginTop: "10px" }}>Lachlan Phillips</p>
        </div>

        {/* Profile Box 3 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "150px",
          }}
        >
          <img
            src="benBrittainLinkedIn.jpeg"
            alt="Profile 3"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <p style={{ color: "white", marginTop: "10px" }}>Benjamin Brittain</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#014B3F", // Background color
          padding: "20px", // Add padding for spacing inside the container
          minHeight: "100vh", // Ensure the section takes up full height
        }}
      >
        {/* Top-Centered Heading */}
        <h1
          style={{
            color: "white", // Make text white
            textAlign: "center", // Center the text horizontally
            marginBottom: "40px", // Add space below the heading
          }}
        >
          Education
        </h1>

        {/* Stack of Divs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Stack divs vertically
            gap: "20px", // Add space between each stack
            alignItems: "center", // Center the stack horizontally
          }}
        >
          {/* Individual Div (1st Profile) */}
          <div
            style={{
              display: "flex",
              width: "80%", // Adjust width as needed for responsiveness
              backgroundColor: "#014B3F", // Match the parent background color (no border effect)
              padding: "20px",
            }}
          >
            {/* Left Side */}
            <div style={{ flex: 1, marginLeft: "80px" }}>
              <h3 style={{ marginBottom: "10px", color: "white" }}>
                Alex Paul
              </h3>
              <p style={{ marginBottom: "10px", color: "white" }}>Marketing</p>
              <p style={{ color: "white" }}>Brigham Young University</p>
            </div>

            {/* Right Side */}
            <div style={{ flex: 2 }}>
              <p style={{ color: "white" }}>
                With an eye towards becoming a strategically-minded product
                marketer, Alex is passionate about solving people's problems and
                helping them feel valued in this increasingly apathetic world. 
              </p>
            </div>
          </div>

          {/* Individual Div (2nd Profile) */}
          <div
            style={{
              display: "flex",
              width: "80%",
              backgroundColor: "#014B3F",
              padding: "20px",
            }}
          >
            {/* Left Side */}
            <div style={{ flex: 1, marginLeft: "80px" }}>
              <h3 style={{ marginBottom: "10px", color: "white" }}>
                Lachlan Phillips
              </h3>
              <p style={{ marginBottom: "10px", color: "white" }}>Economics</p>
              <p style={{ color: "white" }}>Brigham Young University</p>
            </div>

            {/* Right Side */}
            <div style={{ flex: 2 }}>
              <p style={{ color: "white" }}>
                He is an international student from Australia who is currently
                studying Economics & Business at Brigham Young University.  He
                hopes to be able to one day work for startup companies and
                contribute to their overall growth.
              </p>
            </div>
          </div>

          {/* Individual Div (3rd Profile) */}
          <div
            style={{
              display: "flex",
              width: "80%",
              backgroundColor: "#014B3F",
              padding: "20px",
            }}
          >
            {/* Left Side */}
            <div style={{ flex: 1, marginLeft: "80px" }}>
              <h3 style={{ marginBottom: "10px", color: "white" }}>
                Benjamin Brittain
              </h3>
              <p style={{ marginBottom: "10px", color: "white" }}>
                Computer Science
              </p>
              <p style={{ color: "white" }}>Brigham Young University</p>
            </div>

            {/* Right Side */}
            <div style={{ flex: 2 }}>
              <p style={{ color: "white" }}>
                Whether in family, sport, religious, or scholastic pursuits, Ben
                never settles for anything less than excellence. He is currently
                a Computer Science student heading into his junior year. He
                loves learning about new technologies, and his most recent
                exploration has been learning React to add a front end to
                various school and personal projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
