import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userDetails = {
      name,
      contact,
      email,
    };

    try {
      const response = await axios.post("http://localhost:8080/user/", userDetails);
      console.log("User saved:", response.data);
      alert("User saved successfully!");

      // Clear the form
      setName("");
      setContact("");
      setEmail("");
    } catch (error) {
      console.error("There was an error saving the user!", error);
      alert("Failed to save the user. Please try again.");
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formHeadingStyle}>User Details</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

// Styling
const formContainerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f5f5f5",
};

const formHeadingStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  marginBottom: "5px",
  fontSize: "14px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default UserForm;
