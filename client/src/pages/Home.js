import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Form");
  };

  return (
    <>
      <div style={{ display: "flex", height: "50vh" }}>
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
          <button onClick={handleButtonClick}>Start Now</button>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src="PersonHoldingPen.jpg"
            alt="Person doing paperwork"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div></div>
    </>
  );
}

export default Home;
