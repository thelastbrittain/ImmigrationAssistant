import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Form");
  };

  const handleLearnMoreClick = () => {
    navigate("/About");
  };

  return (
    <>
      <div
        style={{ display: "flex", height: "50vh", backgroundColor: "#FFF6EF" }}
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
          <h1>Automate With Ease</h1>
          <h3>Save Time and Effort with Immmigration Assistant</h3>
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
            Start Now
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src="womanFillingForm.png"
            alt="Person doing paperwork"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#C7BCB4",
        }}
      >
        <h1
          style={{
            margin: "20px auto",
          }}
        >
          Why Choose Us
        </h1>
        <p
          style={{
            maxWidth: "800px", // Limit the width of the paragraph for readability
            textAlign: "center", // Center-align the text
            fontSize: "16px", // Default font size for readability
            lineHeight: "1.6", // Improve readability with proper line height
            margin: "30px auto", // Center the paragraph horizontally
          }}
        >
          Immigration Assistant is dedicated to simplifying the green card
          process for individuals through innovative form automation. Our focus
          is on providing efficient solutions for those navigating the
          complexities of marriage-based green card applications. With a
          user-friendly approach, we strive to make the journey smoother and
          stress-free.
        </p>
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
            margin: "20px auto",
          }}
        >
          Start Now
        </button>
      </div>
      <img
        src="familyWalking.png"
        alt="Family Walking on Trail"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#C7BCB4",
        }}
      >
        <h1
          style={{
            margin: "20px auto",
          }}
        >
          Get to Know Us
        </h1>
        <p
          style={{
            maxWidth: "800px", // Limit the width of the paragraph for readability
            textAlign: "center", // Center-align the text
            fontSize: "16px", // Default font size for readability
            lineHeight: "1.6", // Improve readability with proper line height
            margin: "30px auto", // Center the paragraph horizontally
          }}
        >
          Discover the inspiring stories of Lachlan, Ben, and Alex! Join us as
          we delve into their unique journeys, experiences, and the passions
          that drive them. Learn more about the adventures that have shaped
          their lives. 
        </p>
        <button
          onClick={handleLearnMoreClick}
          style={{
            backgroundColor: "#014B3F", // Set background color
            color: "white", // Set text color for contrast
            padding: "12px 22px", // Increase size with padding
            fontSize: "16px", // Make the text larger
            border: "none", // Remove default border
            cursor: "pointer", // Add pointer cursor on hover
            borderRadius: "0px", // Sharp edges (no rounding)
            margin: "20px auto",
          }}
        >
          Learn More
        </button>
      </div>
    </>
  );
}

export default Home;
