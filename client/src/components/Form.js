import React, { useState, useEffect } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/fill-pdfs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

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
    <div>
      <h1>Fill Out the Form</h1>
      <form onSubmit={handleSubmit}>
        {formConfig.map((field) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            <br />
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
            <br />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
