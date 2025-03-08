import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    mobilePhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to the backend
    const response = await fetch("http://127.0.0.1:5000/fill-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filled_form.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert("Failed to fill the PDF.");
    }
  };

  return (
    <div>
      <h1>Fill Out the Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Last Name:</label>
        <br />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <br />

        <label>First Name:</label>
        <br />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <br />

        <label>Middle Name:</label>
        <br />
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />

        <label>Mobile Phone:</label>
        <br />
        <input
          type="tel"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
