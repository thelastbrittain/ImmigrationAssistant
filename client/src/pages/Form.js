import React, { useState, useEffect } from "react";
import "./Form.css";

function Form() {
  const [formConfig, setFormConfig] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch form configuration dynamically (or load locally)
    let configPath = `/form_config.json`;
    fetch(configPath)
      .then((response) => response.json())
      .then((data) => {
        setFormConfig(data);
        // Initialize form data state
        const initialData = {};
        data.forEach((field) => {
          initialData[field.name] = "";
        });
        setFormData(initialData);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const fixDate = (oldDate) => {
    // Parse the input date as a UTC date string
    const date = new Date(oldDate + "T00:00:00Z"); // Adding 'T00:00:00Z' ensures it's treated as UTC

    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`; // Format date as mm/dd/yyyy
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = { ...formData };

    // Iterate over form data to format any date fields
    Object.keys(formattedData).forEach((key) => {
      if (
        formConfig.some((field) => field.name === key && field.type === "date")
      ) {
        formattedData[key] = fixDate(formattedData[key]); // Apply date formatting
      }
    });

    const response = await fetch(
      "https://immigration-api.thelastbrittain.click/fill-pdfs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filled_pdfs.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert("Failed to fill the PDFs.");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Green Card Form</h1>
      <form onSubmit={handleSubmit} className="form">
        {formConfig.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="label">
              {field.label}:
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="input"
            />
          </div>
        ))}
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
