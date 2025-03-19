import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader from react-spinners
import "./Form.css";

function Form() {
  const [formConfig, setFormConfig] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    let configPath = `/form_config.json`;
    fetch(configPath)
      .then((response) => response.json())
      .then((data) => {
        setFormConfig(data);
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
    const date = new Date(oldDate + "T00:00:00Z");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner

    const formattedData = { ...formData };
    Object.keys(formattedData).forEach((key) => {
      if (
        formConfig.some((field) => field.name === key && field.type === "date")
      ) {
        formattedData[key] = fixDate(formattedData[key]);
      }
    });

    try {
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
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading spinner
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
        <button
          type="submit"
          className="button"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ClipLoader color="#FFF6EF" size={20} /> // Show spinner in button
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Form;
